/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { useRef } from 'react';
import { useDataGridContext } from '../DataGridContext';
import { useForkedRef } from '../../_hooks/useForkedRef';

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

const DGHeader = () => {
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
            zIndex: col.freezeLeft ? 1 : undefined
          }}
        >
          {col.children ? (
            <div
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
                fontWeight: 600
                // lineHeight: `${curDepth * rowHeight}px`
              }}
            >
              {col.label}
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
