import React, { useRef, useCallback } from 'react';
import cn from 'classnames';
import { useForkedRef } from '../../_hooks/useForkedRef';
import { isKeyboardKey } from '../../keyboard';
import { useDGScrollContext } from '../context/DGScrollContext';
import { useDGSortContext } from '../context/DGSortContext';
import { DGSortHandler } from './DGSortHandler';

/////////////////////////////////////////////////

const DGHeader = React.memo(
  ({
    uid,
    hasVerticalScroll,
    columns,
    columnStyle,
    rowWidth,
    columnDepth,
    rowHeight,
    scrollbarSize
  }) => {
    const ref = useRef(null);

    const { left, headerRef } = useDGScrollContext();
    const { sortKey, sortOrder, handleSort } = useDGSortContext();

    const forkedRef = useForkedRef(ref, headerRef);

    const handleClickColumn = useCallback(
      (ev, colSortKey) => {
        if (colSortKey) {
          handleSort(colSortKey, sortKey, sortOrder);
        }
      },
      [sortKey, sortOrder, handleSort]
    );

    const handleKeyDown = useCallback(
      (ev, colSortKey) => {
        if (isKeyboardKey(ev, 'Enter') && colSortKey) {
          handleSort(colSortKey, sortKey, sortOrder);
        }
        if (isKeyboardKey(ev, 'Tab')) {
          ev.preventDefault();
        }
      },
      [handleSort, sortKey, sortOrder]
    );

    let flatCellIndex = 0;

    const renderColumn = (cols, depth = 0) => {
      const renderedColumns = [];
      const curDepth = columnDepth - depth;
      for (let i = 0; i < cols.length; i += 1) {
        const col = cols[i];

        const colWidth = col.children
          ? undefined
          : columnStyle[flatCellIndex]
          ? columnStyle[flatCellIndex].width
          : 'auto';

        if (!col.children) {
          flatCellIndex += 1;
        }

        const colSortKey = typeof col.sortKey !== 'undefined' ? col.sortKey : col.key;

        const isSorted = sortKey === colSortKey && sortOrder;

        renderedColumns.push(
          <div
            key={`${uid}-${col.key}`}
            className="datagrid__column"
            id={`${uid}-${col.key}`}
            style={{
              width: colWidth,
              height: curDepth * rowHeight,
              // userSelect: 'none',
              left: col.freezeLeft ? left : undefined,
              zIndex: col.freezeLeft ? 2 : undefined
            }}
          >
            {col.children ? (
              <div className="datagrid__columngroup" role="rowgroup">
                <div
                  className="datagrid__column datagrid__column-bg datagrid__column-value"
                  style={{
                    ...col.headerCellStyle,
                    height: (curDepth - 1) * rowHeight
                  }}
                >
                  {col.label}
                </div>
                <div className="datagrid__columngroup__children" role="row">
                  {renderColumn(col.children, depth + 1)}
                </div>
              </div>
            ) : (
              <span
                role="columnheader"
                tabIndex={0}
                className={cn([
                  'datagrid__column',
                  'datagrid__column-bg',
                  'datagrid__column-value',
                  !colSortKey && 'datagrid__column-disablesort',
                  isSorted && 'datagrid__column-sorted'
                ])}
                title={colSortKey ? 'Click to sort' : undefined}
                style={{
                  ...col.headerCellStyle,
                  width: colWidth,
                  height: curDepth * rowHeight,
                  zIndex: col.freezeLeft ? 2 : undefined
                }}
                onClick={ev => handleClickColumn(ev, colSortKey)}
                onKeyDown={ev => handleKeyDown(ev, colSortKey)}
                data-sortkey={colSortKey}
                aria-sort={isSorted ? (sortOrder === 'asc' ? 'ascending' : 'descending') : 'none'}
              >
                {col.label}
                {isSorted && <DGSortHandler sortOrder={sortOrder} />}
              </span>
            )}
          </div>
        );
      }

      return renderedColumns;
    };

    return (
      <div className="datagrid__header">
        <div ref={forkedRef} className="datagrid__header-pane">
          <div
            role="row"
            className="datagrid__header-columns"
            style={{
              width: hasVerticalScroll ? rowWidth + scrollbarSize : rowWidth
            }}
          >
            {renderColumn(columns, 0)}
            {hasVerticalScroll && (
              <div
                className="datagrid__header-scrolls datagrid__column-bg"
                style={{
                  lineHeight: `${columnDepth * rowHeight}px`,
                  width: scrollbarSize,
                  height: columnDepth * rowHeight
                }}
              />
            )}
          </div>
        </div>
      </div>
    );
  }
);

DGHeader.displayName = 'DGHeader';

export { DGHeader };
