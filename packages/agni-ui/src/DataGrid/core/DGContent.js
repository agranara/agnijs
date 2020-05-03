import React, { useRef, createElement } from 'react';
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
const DGContent = React.memo(
  ({
    uid,
    rowComponent,
    cellComponent,
    getRowDatumStyle,
    contentOffsetTop,
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

    const isRowFnElement = isFunctionElement(rowComponent);
    const isCellFnElement = isFunctionElement(cellComponent);

    const getItemMetadata = index => {
      if (index > metadataRef.current.lastMeasuredIndex) {
        let offset = 0;
        if (metadataRef.current.lastMeasuredIndex >= 0) {
          const itemMetadata = metadataRef.current.itemMap[metadataRef.current.lastMeasuredIndex];
          offset = itemMetadata.offset + itemMetadata.size;
        }

        for (let i = metadataRef.current.lastMeasuredIndex + 1; i <= index; i += 1) {
          const size = rowHeight;

          metadataRef.current.itemMap[i] = {
            offset,
            size
          };

          offset += size;
        }

        metadataRef.current.lastMeasuredIndex = index;
      }

      return metadataRef.current.itemMap[index];
    };

    const findNearestItemBinary = ({ high, low, offset }) => {
      let usedLow = low;
      let usedHigh = high;

      while (usedLow <= usedHigh) {
        const middle = usedLow + Math.floor((usedHigh - usedLow) / 2);

        const metadataOffset = getItemMetadata(middle).offset;

        if (metadataOffset === offset) {
          return middle;
        }
        if (metadataOffset < offset) {
          usedLow = middle + 1;
        } else if (metadataOffset > offset) {
          usedHigh = middle - 1;
        }
      }

      if (usedLow > 0) {
        return usedLow - 1;
      }
      return 0;
    };

    const findNearestItemExponent = ({ index, offset }) => {
      let interval = 1;
      let usedIndex = index;

      while (usedIndex < itemCount && getItemMetadata(usedIndex).offset < offset) {
        usedIndex += interval;
        interval *= 2;
      }

      return findNearestItemBinary({
        high: Math.min(usedIndex, itemCount - 1),
        low: Math.floor(usedIndex / 2),
        offset
      });
    };

    // Get start index to render
    const getStartIndex = () => {
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
    };

    // Get end index to render
    const getEndIndex = startIndex => {
      const itemMetadata = getItemMetadata(startIndex);
      const maxOffset = top + height;

      let offset = itemMetadata.offset + itemMetadata.size;
      let stopIndex = startIndex;

      while (stopIndex < itemCount - 1 && offset < maxOffset) {
        stopIndex += 1;
        offset += getItemMetadata(stopIndex).size;
      }

      return stopIndex;
    };

    // Get value from cache
    // else insert value to cache
    const getCellValue = ({ indexRow, indexCell, record, column }) => {
      let result = get(record, column.key) || null;

      if (column.renderCellValue) {
        result = column.renderCellValue({
          record,
          column,
          indexRow,
          indexCell
        });
      }

      return result;
    };

    // Get cell style from cache
    // else insert style to cache
    const getOrSetCellStyle = ({ cache, indexRow, indexCell, record, column }) => {
      if (!cellStyleRef.current[indexRow]) {
        cellStyleRef.current[indexRow] = {};
      }

      if (!cellStyleRef.current[indexRow][indexCell]) {
        const { left: cellLeft, width: cellWidth } = cache[indexCell];

        const columnStyleProp = column && column.cellStyle ? column.cellStyle : {};

        const columnStyleFunc =
          column && column.renderCellStyle
            ? column.renderCellStyle({ indexCell, indexRow, record, column })
            : {};

        cellStyleRef.current[indexRow][indexCell] = {
          ...columnStyleProp,
          ...columnStyleFunc,
          left: cellLeft,
          width: cellWidth,
          height: rowHeight,
          zIndex: column.freezeLeft ? 2 : undefined
        };
      }

      return cellStyleRef.current[indexRow][indexCell];
    };
    // Get row style from cache
    // else insert style to cache
    const getOrSetRowStyle = ({ index, record, rowStyle }) => {
      if (!rowStyleRef.current[index]) {
        const rowStyleProps = rowStyle ? rowStyle({ indexRow: index, record }) : {};

        rowStyleRef.current[index] = {
          ...rowStyleProps,
          top: index * rowHeight,
          height: rowHeight
        };
      }
      return rowStyleRef.current[index];
    };

    const getRenderRange = () => {
      const start = getStartIndex();
      const end = getEndIndex(start);

      // Overscan count, currently hardcoded to 2
      const overscanBackward = !isScrolling || scrollDirection === 'backward' ? 2 : 1;
      const overscanForward = !isScrolling || scrollDirection === 'forward' ? 2 : 1;

      return [
        Math.max(0, start - overscanBackward),
        Math.max(0, Math.min(itemCount - 1, end + overscanForward))
      ];
    };

    const [renderStartIndex, renderEndIndex] = getRenderRange();

    const rows = [];
    for (let i = renderStartIndex; i <= renderEndIndex; i += 1) {
      const row = data[i] || {};
      const cells = [];

      for (let j = 0; j < columnFlat.length; j += 1) {
        const col = columnFlat[j];

        const cachedCellStyle = getOrSetCellStyle({
          indexCell: j,
          indexRow: i,
          column: col,
          record: row,
          cache: columnStyle
          // rowHeight
        });

        const cachedValue = getCellValue({
          indexCell: j,
          indexRow: i,
          column: col,
          record: row
        });

        const notDomProps = isCellFnElement
          ? {
              record: row,
              column: col,
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
                transform: col.freezeLeft ? `translateX(${left}px) translateZ(0)` : undefined
              }
            },
            cachedValue
          )
        );
      }

      const notDomRowProps = isRowFnElement
        ? {
            record: row,
            indexRow: i
          }
        : {};

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
              rowStyle: getRowDatumStyle
              // rowHeight,
            }),
            ...notDomRowProps
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
              width: rowWidth,
              height: itemCount * rowHeight,
              pointerEvents: isScrolling ? 'none' : undefined
            }}
          >
            {rows}
          </div>
        </div>
      </div>
    );
  }
);

DGContent.displayName = 'DGContent';

export { DGContent };
