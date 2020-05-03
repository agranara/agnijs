import React, { useLayoutEffect, useRef } from 'react';
import { useDGColumnContext } from '../context/DGColumnContext';
import { useDGMetaContext } from '../context/DGMetaContext';
import { useDGDataContext } from '../context/DGDataContext';
import { DGCell } from './DGCell';

const DGShadow = () => {
  const { flatColumns, setCellWidths } = useDGColumnContext();
  const { data, setRowWidth, hasVerticalScroll, getRowHeight } = useDGDataContext();
  const { uid, sampleStart, sampleEnd, scrollbarSize, cellComponent } = useDGMetaContext();

  const columnRefs = useRef([]);

  const tableRef = useRef(null);

  // Immediate execution after page load
  // set width for columns from loaded sample data
  useLayoutEffect(() => {
    let totalWidth = 0;

    const newColumnWidths = [];
    for (let i = 0; i < columnRefs.current.length; i += 1) {
      const sampleCell = columnRefs.current[i];

      const newWidth = sampleCell.offsetWidth;
      newColumnWidths.push(newWidth);
      totalWidth += newWidth;
    }
    setRowWidth(totalWidth);
    setCellWidths(newColumnWidths);
  }, [setCellWidths, setRowWidth, data, flatColumns, hasVerticalScroll]);

  // Provide extension width for each cells
  // through padding styling
  const sampleHeader = [];
  for (let i = 0; i < flatColumns.length; i += 1) {
    const col = flatColumns[i];

    let width;
    if (col.renderWidth) {
      width = col.renderWidth({ indexCell: i });
    } else if (col.width) {
      width = col.width;
    }

    sampleHeader.push(
      <th
        key={`${uid}-sample-${col.key}`}
        className="datagrid__header-column"
        style={{ width, borderWidth: 1 }}
      >
        {col.label}
      </th>
    );
  }

  const sampleData = [];
  for (let i = sampleStart; i < sampleEnd; i += 1) {
    const row = data[i];

    const rowHeight = getRowHeight(i);

    const cells = [];
    for (let ii = 0; ii < flatColumns.length; ii += 1) {
      const col = flatColumns[ii];

      cells.push(
        <td
          key={`${uid}_shadow_${i}_${ii}`}
          ref={node => {
            if (!columnRefs.current[ii]) columnRefs.current[ii] = node;
          }}
        >
          <DGCell
            cellComponent={cellComponent}
            className="datagrid__sample-cell"
            style={{
              height: rowHeight
            }}
            record={row}
            indexRow={i}
            indexCell={ii}
            column={col}
          />
        </td>
      );
    }

    if (hasVerticalScroll) {
      cells.push(
        <td
          key={`${uid}-shadow-${i}`}
          style={{
            width: scrollbarSize,
            minWidth: scrollbarSize,
            maxWidth: scrollbarSize
          }}
        >
          &nbsp;
        </td>
      );
    }

    sampleData.push(<tr key={i}>{cells}</tr>);
  }

  return (
    <div
      style={{
        position: 'absolute',
        top: '-100%',
        left: '-100%',
        height: 0,
        width: '100%',
        overflow: 'hidden'
      }}
    >
      <div
        className="datagrid__shadow"
        style={{
          overflow: 'auto'
        }}
      >
        <table
          ref={tableRef}
          style={{ width: '100%', borderCollapse: 'collapse' }}
          cellPadding={0}
          cellSpacing={0}
        >
          <thead>
            <tr>
              {sampleHeader}
              {hasVerticalScroll && (
                <th
                  style={{
                    width: scrollbarSize,
                    minWidth: scrollbarSize,
                    maxWidth: scrollbarSize
                  }}
                >
                  &nbsp;
                </th>
              )}
            </tr>
          </thead>
          <tbody>{sampleData}</tbody>
        </table>
      </div>
    </div>
  );
};

DGShadow.displayName = 'DGShadow';

export { DGShadow };
