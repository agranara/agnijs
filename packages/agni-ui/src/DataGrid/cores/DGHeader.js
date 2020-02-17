/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { useRef, useCallback } from 'react';
import { FiArrowUp, FiArrowDown } from 'react-icons/fi';
import { useDataGridContext } from '../DataGridContext';
import { useUiTheme } from '../../UiProvider';
import { useForkedRef } from '../../_hooks/useForkedRef';
import { isKeyboardKey } from '../../keyboard';
import { SORT_ASC, SORT_DESC } from './useSortHandler';

const DGSortHandler = ({ sortOrder }) => {
  const theme = useUiTheme();
  let sortIcon = null;
  if (sortOrder === SORT_ASC) {
    sortIcon = <FiArrowUp />;
  } else if (sortOrder === SORT_DESC) {
    sortIcon = <FiArrowDown />;
  }

  return (
    <div
      css={css([
        {
          position: 'absolute',
          right: 2,
          color: theme.colors.primary[500]
        }
      ])}
    >
      {sortIcon}
    </div>
  );
};

DGSortHandler.displayName = 'DGSortHandler';

//////////////////////////////////////////////////////////

const columnStyle = css`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const columnBgStyle = css`
  /* box-shadow: inset 0 0 0 1px #e2e8f0; */
  background-image: linear-gradient(rgb(255, 255, 255), rgb(244, 245, 247));
  box-shadow: rgba(67, 90, 111, 0.14) 0px 0px 0px 1px inset,
    rgba(67, 90, 111, 0.06) 0px -1px 1px 0px inset;
`;

const DGHeader = ({ sortKey, sortOrder, handleSort }) => {
  const ref = useRef();

  const {
    actualWidth,
    columns,
    columnStyleRef,
    uid,
    rowHeight,
    columnDepth,
    headerRef,
    hasScrollHeader,
    scrollState
  } = useDataGridContext();

  const forkedRef = useForkedRef(ref, headerRef);

  const handleClickColumn = useCallback(
    ev => {
      const colSortKey = ev.currentTarget.dataset ? ev.currentTarget.dataset['sortkey'] : undefined;
      handleSort(colSortKey, sortKey, sortOrder);
    },
    [sortKey, sortOrder, handleSort]
  );

  const handleKeyDown = useCallback(
    ev => {
      const colSortKey = ev.currentTarget.dataset ? ev.currentTarget.dataset['sortkey'] : undefined;
      if (isKeyboardKey(ev, 'Enter')) {
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
    for (let i = 0; i < cols.length; i++) {
      const col = cols[i];

      const colWidth = col.children ? undefined : columnStyleRef.current[flatCellIndex].width;

      if (!col.children) {
        flatCellIndex += 1;
      }

      renderedColumns.push(
        <div
          key={`${uid}-${col.key}`}
          className="datagrid__column"
          id={`${uid}-${col.key}`}
          css={css([columnStyle])}
          style={{
            width: colWidth,
            height: curDepth * rowHeight,
            userSelect: 'none',
            left: col.freezeLeft ? scrollState.left : undefined,
            zIndex: col.freezeLeft ? 2 : undefined
          }}
        >
          {col.children ? (
            <div
              role="rowgroup"
              css={css([
                {
                  display: 'flex',
                  flexDirection: 'column',
                  flexWrap: 'nowrap'
                }
              ])}
            >
              <div
                css={css([
                  columnBgStyle,
                  {
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textTransform: 'uppercase',
                    fontSize: 12,
                    fontWeight: 600,
                    height: (curDepth - 1) * rowHeight
                  }
                ])}
              >
                {col.label}
              </div>
              <div
                role="row"
                css={{
                  display: 'flex',
                  flexDirection: 'row',
                  flexWrap: 'nowrap'
                }}
              >
                {renderColumn(col.children, depth + 1)}
              </div>
            </div>
          ) : (
            <span
              role="columnheader"
              tabIndex={0}
              css={css([columnStyle, columnBgStyle])}
              style={{
                paddingLeft: 8,
                paddingRight: 8,
                width: colWidth,
                maxWidth: colWidth,
                height: curDepth * rowHeight,
                textAlign: 'center',
                textTransform: 'uppercase',
                fontSize: 12,
                fontWeight: 600,
                cursor: 'pointer',
                zIndex: col.freezeLeft ? 2 : undefined
                // lineHeight: `${curDepth * rowHeight}px`
              }}
              onClick={handleClickColumn}
              onKeyDown={handleKeyDown}
              data-sortkey={col.sortKey ? col.sortKey : col.key}
              aria-sort={
                sortKey === col.key && sortOrder
                  ? sortOrder === 'asc'
                    ? 'ascending'
                    : 'descending'
                  : 'none'
              }
            >
              {col.label}
              {sortKey === col.key && sortOrder && <DGSortHandler sortOrder={sortOrder} />}
            </span>
          )}
        </div>
      );
    }

    return renderedColumns;
  };

  return (
    <div
      className="datagrid__header"
      style={{
        display: 'block',
        width: '100%',
        position: 'absolute',
        outline: 0,
        overflow: 'hidden'
      }}
    >
      <div
        ref={forkedRef}
        className="datagrid__header-relative"
        style={{
          position: 'relative',
          width: '100%',
          overflow: 'inherit',
          backgroundColor: 'rgb(237, 242, 247)'
        }}
      >
        <div
          role="row"
          className="datagrid__header-columns"
          css={css({
            position: 'relative',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            width: hasScrollHeader ? actualWidth + 17 : actualWidth,
            // display: 'block'
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'nowrap'
          })}
        >
          {renderColumn(columns, 0)}
          {hasScrollHeader && (
            <div
              css={css([
                columnBgStyle,
                {
                  display: 'block',
                  position: 'relative',
                  lineHeight: `${columnDepth * rowHeight}px`,
                  // float: 'left',
                  // background: 'transparent',
                  width: 17,
                  height: columnDepth * rowHeight
                }
              ])}
            />
          )}
        </div>
      </div>
    </div>
  );
};

DGHeader.displayName = 'DGHeader';

export { DGHeader };
