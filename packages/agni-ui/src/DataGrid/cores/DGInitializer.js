import React, { useLayoutEffect, useRef } from 'react';
import { get } from '../../_utils/get';
import { useDataGridContext } from '../DataGridContext';

const DGInitializer = () => {
  const initializerRef = useRef(null);
  const columnRefs = useRef([]);
  const {
    uid,
    setReady,
    columnStyleRef,
    flatColumns,
    sampleStart,
    data,
    sampleEnd
  } = useDataGridContext();

  useLayoutEffect(() => {
    let totalWidth = 0;
    for (let i = 0; i < columnRefs.current.length; i++) {
      const sampleCell = columnRefs.current[i];

      if (!columnStyleRef.current[i]) columnStyleRef.current[i] = {};
      columnStyleRef.current[i].width = sampleCell.offsetWidth;
      columnStyleRef.current[i].left = totalWidth;

      totalWidth += sampleCell.offsetWidth;
    }

    const hasScroll = initializerRef.current.scrollWidth > initializerRef.current.clientWidth;

    setReady([true, hasScroll, totalWidth]);
  }, [columnStyleRef, setReady]);

  // Provide extension width for each cells
  // through padding styling
  const sampleHeader = [];
  for (let i = 0; i < flatColumns.length; i++) {
    const col = flatColumns[i];

    sampleHeader.push(
      <th
        key={`${uid}-sample-${col.key}`}
        style={{ padding: '0.5rem 1rem', whiteSpace: 'nowrap', borderWidth: 1 }}
      >
        {col.label}
      </th>
    );
  }

  const sampleData = [];
  for (let i = sampleStart; i < sampleEnd; i++) {
    const datum = data[i];
    const cells = [];
    for (let ii = 0; ii < flatColumns.length; ii++) {
      const col = flatColumns[ii];
      cells.push(
        <td
          key={`${i}-${ii}`}
          ref={node => {
            columnRefs.current[ii] = node;
          }}
          style={{ padding: '0.5rem 1rem', whiteSpace: 'nowrap' }}
        >
          {get(datum, col.key)}
        </td>
      );
    }

    sampleData.push(<tr key={i}>{cells}</tr>);
  }

  return (
    <div style={{ overflow: 'auto' }} ref={initializerRef}>
      <table style={{ width: '100%' }}>
        <thead>
          <tr>{sampleHeader}</tr>
        </thead>
        <tbody>{sampleData}</tbody>
      </table>
    </div>
  );
};

DGInitializer.displayName = 'DGInitializer';

export { DGInitializer };
