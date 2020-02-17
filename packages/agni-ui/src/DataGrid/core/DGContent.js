import React, { useRef, useCallback, createElement } from 'react';
import { get } from '../../_utils/get';
import { useDGScrollContext } from '../context/DGScrollContext';

const isFunctionElement = element => typeof element === 'function';

/**
 * Data grid content renderer
 * Code below was derivative from react-window repository with some tweaks to suit table purpose
 *
 * Thanks to react-window team
 * Original Source: https://github.com/bvaughn/react-window/blob/master/src/VariableSizeList.js
 */
const DGContent = ({
  uid,
  rowComponent,
  cellComponent,
  getRowDatumStyle,
  isHeadless,
  hasScrollHeader,
  columnDepth,
  columnFlat,
  columnStyle,
  rowHeight,
  rowWidth,
  itemCount,
  data,
  height
}) => {
  const tableRef = useRef(null);
  const rowStyleRef = useRef({});
  const cellStyleRef = useRef({});
  const cellValueRef = useRef({});

  const {
    top,
    left,
    contentRef,
    scrollDirection,
    onScrollBody,
    isScrolling
  } = useDGScrollContext();

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

    if (lastMeasuredOffsetTop >= top) {
      return findNearestItemBinary({
        high: lastMeasuredIndex,
        low: 0,
        offset: top
      });
    }

    return findNearestItemExponent({
      index: Math.max(0, lastMeasuredIndex),
      offset: top
    });
  }, [findNearestItemBinary, findNearestItemExponent, top]);

  // Get end index to render
  const getEndIndex = useCallback(
    startIndex => {
      const itemMetadata = getItemMetadata(startIndex);
      const maxOffset = top + height;

      let offset = itemMetadata.offset + itemMetadata.size;
      let stopIndex = startIndex;

      while (stopIndex < itemCount - 1 && offset < maxOffset) {
        stopIndex += 1;
        offset += getItemMetadata(stopIndex).size;
      }

      return stopIndex;
    },
    [getItemMetadata, height, itemCount, top]
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
          ...columnStyleProp,
          ...columnStyleFunc,
          left,
          width: isLast && !hasScrollHeader ? cellWidth - 17 : cellWidth,
          height: rowHeight
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
        ...rowStyleProps,
        top: index * rowHeight,
        height: rowHeight
      };
    }
    return rowStyleRef.current[index];
  }, []);

  const getRenderRange = useCallback(() => {
    const start = getStartIndex();
    const end = getEndIndex(start);

    // Overscan count, currently hardcoded to 2
    const overscanBackward = !isScrolling || scrollDirection === 'backward' ? 2 : 1;
    const overscanForward = !isScrolling || scrollDirection === 'forward' ? 2 : 1;

    return [
      Math.max(0, start - overscanBackward),
      Math.max(0, Math.min(itemCount - 1, end + overscanForward))
    ];
  }, [getEndIndex, getStartIndex, isScrolling, itemCount, scrollDirection]);

  const contentOffsetTop = !isHeadless ? columnDepth * rowHeight : 0;

  const [renderStartIndex, renderEndIndex] = getRenderRange();

  const rows = [];
  for (let i = renderStartIndex; i <= renderEndIndex; i++) {
    const row = data[i];
    const cells = [];

    for (let j = 0; j < columnFlat.length; j++) {
      const col = columnFlat[j];

      const cachedCellStyle = getOrSetCellStyle({
        indexCell: j,
        indexRow: i,
        column: col,
        record: row,
        isLast: j === columnFlat.length - 1,
        hasScrollHeader,
        cache: columnStyle,
        rowHeight
      });

      const cachedValue = getOrSetValueCache({
        indexCell: j,
        indexRow: i,
        column: col,
        record: row
      });

      const notDomProps = isFunctionElement(cellComponent)
        ? {
            record: row,
            indexCell: j,
            indexRow: i
          }
        : {};

      cells.push(
        createElement(
          cellComponent,
          {
            ...notDomProps,
            key: `${uid}-cell-${i}-${j}`,
            role: 'cell',
            className: 'datagrid__cell',
            'aria-colindex': j,
            style: {
              ...cachedCellStyle,
              left: col.freezeLeft ? cachedCellStyle.left + left : cachedCellStyle.left,
              zIndex: col.freezeLeft ? 2 : undefined
            }
          },
          cachedValue
        )
      );
    }
    rows.push(
      createElement(
        rowComponent,
        {
          key: `${uid}-row-${i}`,
          className: 'datagrid__row',
          role: 'row',
          'aria-rowindex': i,
          style: getOrSetRowStyle({
            index: i,
            record: row,
            rowHeight,
            rowStyle: getRowDatumStyle
          }),
          record: isFunctionElement(rowComponent) ? row : undefined,
          indexRow: isFunctionElement(rowComponent) ? i : undefined
        },
        cells
      )
    );
  }

  return (
    <div
      className="datagrid__content"
      style={{
        top: contentOffsetTop,
        height: height - contentOffsetTop
      }}
    >
      <div
        ref={contentRef}
        className="datagrid__content-table"
        style={{
          height: height - contentOffsetTop
        }}
        onScroll={onScrollBody}
      >
        <div
          className="datagrid__content-tbody"
          ref={tableRef}
          role="grid"
          aria-labelledby={uid}
          aria-rowcount={itemCount}
          aria-colcount={columnFlat.length}
          style={{
            width: !hasScrollHeader ? rowWidth - 17 : rowWidth,
            height: itemCount * rowHeight,
            pointerEvents: isScrolling ? 'none' : undefined
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
