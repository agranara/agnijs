/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { useRef, useCallback } from 'react';
import { get } from '../../_utils/get';
import { useDataGridContext } from '../DataGridContext';

const rowStyle = css`
  &.datagrid__row {
    transition: background-color 0.2s;
    &:hover {
      background-color: #edf2f7 !important;
    }
  }
`;

/**
 * Data grid content renderer
 * Code below was derivative from react-window repository with some tweaks to suit table purpose
 *
 * Thanks to react-window team
 * Original Source: https://github.com/bvaughn/react-window/blob/master/src/VariableSizeList.js
 */
const DGContent = () => {
  const tableRef = useRef(null);
  const rowStyleRef = useRef({});
  const cellStyleRef = useRef({});
  const cellValueRef = useRef({});

  const {
    uid,
    data,
    actualWidth,
    flatColumns,
    rowHeight,
    itemCount,
    height,
    scrollState,
    contentRef,
    onScrollBody,
    columnStyleRef,
    columnDepth,
    hasScrollHeader,
    getRowDatumStyle
  } = useDataGridContext();

  const metadataRef = useRef({
    itemMap: {},
    estimatedItemSize: rowHeight,
    lastMeasuredIndex: -1
  });

  const getItemMetadata = useCallback(
    index => {
      if (index > metadataRef.current.lastMeasuredIndex) {
        let offset = 0;
        if (metadataRef.current.lastMeasuredIndex >= 0) {
          const itemMetadata = metadataRef.current.itemMap[metadataRef.current.lastMeasuredIndex];
          offset = itemMetadata.offset + itemMetadata.size;
        }

        for (let i = metadataRef.current.lastMeasuredIndex + 1; i <= index; i++) {
          let size = rowHeight;

          metadataRef.current.itemMap[i] = {
            offset,
            size
          };

          offset += size;
        }

        metadataRef.current.lastMeasuredIndex = index;
      }

      return metadataRef.current.itemMap[index];
    },
    [rowHeight]
  );

  const findNearestItemBinary = useCallback(
    ({ high, low, offset }) => {
      while (low <= high) {
        const middle = low + Math.floor((high - low) / 2);

        const metadataOffset = getItemMetadata(middle).offset;

        if (metadataOffset === offset) {
          return middle;
        } else if (metadataOffset < offset) {
          low = middle + 1;
        } else if (metadataOffset > offset) {
          high = middle - 1;
        }
      }

      if (low > 0) {
        return low - 1;
      }
      return 0;
    },
    [getItemMetadata]
  );

  const findNearestItemExponent = useCallback(
    ({ index, offset }) => {
      let interval = 1;

      while (index < itemCount && getItemMetadata(index).offset < offset) {
        index += interval;
        interval *= 2;
      }

      return findNearestItemBinary({
        high: Math.min(index, itemCount - 1),
        low: Math.floor(index / 2),
        offset
      });
    },
    [findNearestItemBinary, getItemMetadata, itemCount]
  );

  // Get start index to render
  const getStartIndex = useCallback(() => {
    const { lastMeasuredIndex, itemMap } = metadataRef.current;

    const lastMeasuredOffsetTop = lastMeasuredIndex > 0 ? itemMap[lastMeasuredIndex].offset : 0;

    if (lastMeasuredOffsetTop >= scrollState.top) {
      return findNearestItemBinary({
        high: lastMeasuredIndex,
        low: 0,
        offset: scrollState.top
      });
    }

    return findNearestItemExponent({
      index: Math.max(0, lastMeasuredIndex),
      offset: scrollState.top
    });
  }, [findNearestItemBinary, findNearestItemExponent, scrollState.top]);

  // Get end index to render
  const getEndIndex = useCallback(
    startIndex => {
      const itemMetadata = getItemMetadata(startIndex);
      const maxOffset = scrollState.top + height;

      let offset = itemMetadata.offset + itemMetadata.size;
      let stopIndex = startIndex;

      while (stopIndex < itemCount - 1 && offset < maxOffset) {
        stopIndex += 1;
        offset += getItemMetadata(stopIndex).size;
      }

      return stopIndex;
    },
    [getItemMetadata, height, itemCount, scrollState.top]
  );

  // Get value from cache
  // else insert value to cache
  const getOrSetValueCache = useCallback(({ indexRow, indexCell, record, column }) => {
    if (!cellValueRef.current[indexRow]) {
      cellValueRef.current[indexRow] = {};
    }

    if (!cellValueRef.current[indexRow][indexCell]) {
      const valueByLabel = get(record, column.key) || null;
      cellValueRef.current[indexRow][indexCell] = valueByLabel;

      if (column.renderCellValue) {
        cellValueRef.current[indexRow][indexCell] = column.renderCellValue({
          record,
          indexRow,
          indexCell
        });
      }
    }

    return cellValueRef.current[indexRow][indexCell];
  }, []);

  // Get cell style from cache
  // else insert style to cache
  const getOrSetCellStyle = useCallback(
    ({
      cache,
      indexRow,
      indexCell,
      record,
      column,
      rowHeight,
      isLast = false,
      hasScrollHeader = false
    }) => {
      if (!cellStyleRef.current[indexRow]) {
        cellStyleRef.current[indexRow] = {};
      }

      if (!cellStyleRef.current[indexRow][indexCell]) {
        const { left, width: cellWidth } = cache[indexCell];

        const columnStyleProp = column && column.cellStyle ? column.cellStyle : {};

        const columnStyleFunc =
          column && column.renderCellStyle
            ? column.renderCellStyle({ indexCell, indexRow, record })
            : {};

        cellStyleRef.current[indexRow][indexCell] = {
          backgroundColor: 'inherit',
          ...columnStyleProp,
          ...columnStyleFunc,
          position: 'absolute',
          left,
          width: isLast && !hasScrollHeader ? cellWidth - 17 : cellWidth,
          height: rowHeight,
          whiteSpace: 'nowrap',
          textOverflow: 'ellipsis',
          padding: '4px',
          display: 'inline-flex',
          alignItems: 'center'
        };
      }

      return cellStyleRef.current[indexRow][indexCell];
    },
    []
  );

  // Get row style from cache
  // else insert style to cache
  const getOrSetRowStyle = useCallback(({ index, record, rowHeight, rowStyle }) => {
    if (!rowStyleRef.current[index]) {
      const rowStyleProps = rowStyle ? rowStyle({ index: index, record }) : {};

      rowStyleRef.current[index] = {
        backgroundColor: 'white',
        ...rowStyleProps,
        position: 'absolute',
        width: '100%',
        top: index * rowHeight,
        height: rowHeight
      };
    }
    return rowStyleRef.current[index];
  }, []);

  const getRenderRange = useCallback(() => {
    const start = getStartIndex();
    const end = getEndIndex(start);

    return [start, end];
  }, [getEndIndex, getStartIndex]);

  const top = columnDepth * rowHeight;

  const [renderStartIndex, renderEndIndex] = getRenderRange();

  const rows = [];
  for (let i = renderStartIndex; i <= renderEndIndex; i++) {
    const row = data[i];
    const cells = [];

    for (let j = 0; j < flatColumns.length; j++) {
      const col = flatColumns[j];

      const cachedCellStyle = getOrSetCellStyle({
        indexCell: j,
        indexRow: i,
        column: col,
        record: row,
        isLast: j === flatColumns.length - 1,
        hasScrollHeader,
        cache: columnStyleRef.current,
        rowHeight
      });

      const cachedValue = getOrSetValueCache({
        indexCell: j,
        indexRow: i,
        column: col,
        record: row
      });

      cells.push(
        <div
          className="datagrid__cell"
          aria-colindex={j}
          key={`${uid}-cell-${i}-${j}`}
          style={{
            ...cachedCellStyle,
            left: col.freezeLeft ? cachedCellStyle.left + scrollState.left : cachedCellStyle.left,
            zIndex: col.freezeLeft ? 1 : undefined
          }}
        >
          {cachedValue}
        </div>
      );
    }
    rows.push(
      <div
        className="datagrid__row"
        aria-rowindex={i}
        key={`${uid}-row-${i}`}
        css={css([rowStyle])}
        style={getOrSetRowStyle({
          index: i,
          record: row,
          rowHeight,
          rowStyle: getRowDatumStyle
        })}
      >
        {cells}
      </div>
    );
  }

  return (
    <div
      className="datagrid__content"
      style={{
        position: 'absolute',
        top,
        height: height - top,
        width: '100%',
        overflow: 'auto'
      }}
    >
      <div
        ref={contentRef}
        className="datagrid__content-table"
        style={{
          height: height - top,
          position: 'relative',
          width: '100%',
          overflow: 'auto',
          outline: 0
        }}
        onScroll={onScrollBody}
      >
        <div
          ref={tableRef}
          role="grid"
          aria-labelledby={uid}
          aria-rowcount={itemCount}
          aria-colcount={flatColumns.length}
          style={{
            position: 'relative',
            width: !hasScrollHeader ? actualWidth - 17 : actualWidth,
            height: itemCount * rowHeight
          }}
        >
          {rows}
        </div>
      </div>
    </div>
  );
};

DGContent.displayName = 'DGContent';

export { DGContent };
