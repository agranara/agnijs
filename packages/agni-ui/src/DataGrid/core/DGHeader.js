import React, { useCallback } from 'react';
import { FiArrowUp, FiArrowDown } from 'react-icons/fi';

import cn from 'classnames';
import { useDGDataContext } from '../context/DGDataContext';
import { useDGMetaContext } from '../context/DGMetaContext';
import { useDGColumnContext } from '../context/DGColumnContext';
import { useDGSortContext } from '../context/DGSortContext';
import { isKeyboardKey } from '../../keyboard';
import { SORT_ASC, SORT_DESC } from '../constant';

const DGSortHandler = ({ sortOrder }) => {
  let sortIcon = null;
  if (sortOrder === SORT_ASC) {
    sortIcon = <FiArrowUp />;
  } else if (sortOrder === SORT_DESC) {
    sortIcon = <FiArrowDown />;
  }

  return <div className="datagrid__column-sortable">{sortIcon}</div>;
};

DGSortHandler.displayName = 'DGSortHandler';

const cellHeaderHeight = 36;

const DGHeader = () => {
  const { uid, scrollbarSize } = useDGMetaContext();
  const { columnDepth, columns, columnWidths } = useDGColumnContext();
  const { headerCallbackRef, rowWidth, hasVerticalScroll, left } = useDGDataContext();
  const { sortKey, sortOrder, handleSort } = useDGSortContext();

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
        : columnWidths[flatCellIndex]
        ? columnWidths[flatCellIndex]
        : 'auto';

      if (!col.children) {
        flatCellIndex += 1;
      }

      const colSortKey = typeof col.sortKey !== 'undefined' ? col.sortKey : col.key;

      const isSortByThis = sortKey === colSortKey && sortOrder;

      renderedColumns.push(
        <div
          key={`${uid}-${col.key}`}
          className="datagrid__column"
          id={`${uid}-${col.key}`}
          style={{
            width: colWidth,
            height: curDepth * cellHeaderHeight,
            // userSelect: 'none',
            transform: col.freezeLeft && left ? `translateX(${left}px) translateZ(0)` : undefined,
            zIndex: col.freezeLeft ? 2 : undefined
          }}
        >
          {col.children ? (
            <div className="datagrid__columngroup" role="rowgroup">
              <div
                className="datagrid__column datagrid__column-bg datagrid__column-value"
                style={{
                  ...col.headerCellStyle,
                  height: (curDepth - 1) * cellHeaderHeight
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
                isSortByThis && 'datagrid__column-sorted'
              ])}
              title={colSortKey ? 'Click to sort' : undefined}
              style={{
                ...col.headerCellStyle,
                width: colWidth,
                height: curDepth * cellHeaderHeight,
                zIndex: col.freezeLeft ? 2 : undefined
              }}
              onClick={ev => handleClickColumn(ev, colSortKey)}
              onKeyDown={ev => handleKeyDown(ev, colSortKey)}
              data-sortkey={colSortKey}
              aria-sort={isSortByThis ? (sortOrder === 'asc' ? 'ascending' : 'descending') : 'none'}
            >
              {col.label}
              {isSortByThis && <DGSortHandler sortOrder={sortOrder} />}
            </span>
          )}
        </div>
      );
    }

    return renderedColumns;
  };

  return (
    <div className="datagrid__header">
      <div ref={headerCallbackRef} className="datagrid__header-pane">
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
                lineHeight: `${columnDepth * cellHeaderHeight}px`,
                width: scrollbarSize,
                height: columnDepth * cellHeaderHeight
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

DGHeader.displayName = 'DGHeader';

export { DGHeader };
