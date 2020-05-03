import React from 'react';
import { useDGDataContext } from '../context/DGDataContext';
import { useDGMetaContext } from '../context/DGMetaContext';
import { useDGColumnContext } from '../context/DGColumnContext';
import { DGCell } from './DGCell';
import { DGRow } from './DGRow';

const DGBody = () => {
  const {
    uid,
    rowComponent,
    cellComponent,
    containerHeight,
    getRowDatumStyle
  } = useDGMetaContext();
  const { flatColumns, getCellStyle } = useDGColumnContext();
  const {
    data,
    startIndex,
    endIndex,
    rowWidth,
    totalHeight,
    onContentScroll,
    contentCallbackRef,
    contentPaddingTop,
    left,
    getRowHeight
  } = useDGDataContext();

  const itemCount = data.length;

  const rows = [];
  for (let i = startIndex; i < endIndex; i += 1) {
    const row = data[i];
    const cells = [];

    const rowHeight = getRowHeight(i);

    for (let j = 0; j < flatColumns.length; j += 1) {
      const col = flatColumns[j];

      const cachedCellStyle = getCellStyle(j, i, row, col);

      cells.push(
        <DGCell
          key={`${uid}-cell-${i}-${j}`}
          cellComponent={cellComponent}
          indexCell={j}
          indexRow={i}
          record={row || {}}
          column={col}
          style={{
            ...cachedCellStyle,
            height: rowHeight,
            transform: col.freezeLeft && left ? `translateX(${left}px) translateZ(0)` : undefined,
            zIndex: col.freezeLeft ? 2 : undefined
          }}
        />
      );
    }

    rows.push(
      <DGRow
        key={`${uid}-row-${i}`}
        indexRow={i}
        record={row || {}}
        style={{
          width: rowWidth,
          height: rowHeight
        }}
        rowComponent={rowComponent}
        getRowDatumStyle={getRowDatumStyle}
      >
        {cells}
      </DGRow>
    );
  }

  return (
    <div
      ref={contentCallbackRef}
      className="datagrid__content"
      onScroll={onContentScroll}
      style={{ height: containerHeight }}
    >
      <div
        className="datagrid__content-body"
        role="grid"
        aria-labelledby={uid}
        aria-rowcount={itemCount}
        aria-colcount={flatColumns.length}
        style={{
          width: rowWidth,
          height: totalHeight,
          paddingTop: contentPaddingTop
        }}
      >
        {rows}
      </div>
    </div>
  );
};

DGBody.displayName = 'DGBody';

export { DGBody };
