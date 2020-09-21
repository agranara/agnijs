/* eslint-disable no-param-reassign */
import React, { useRef, Fragment, useEffect, useState } from 'react';
import { useEnhancedEffect } from '../../_hooks/useEnhancedEffect';
import { get } from '../../_utils/get';
import { Spinner } from '../../Spinner';
import { getScrollbarSize } from '../../_utils/getScrollbarSize';

const DGInitializer = ({
  uid,
  data,
  rowHeight,
  sampleStart,
  sampleEnd,
  setMeta,
  columnStyle,
  columnFlat,
  height
}) => {
  const initializerRef = useRef(null);
  const columnRefs = useRef([]);

  const prevSize = useRef(data.length * rowHeight > height);
  const [hasVerticalScroll, setVerticalScroll] = useState(() => data.length * rowHeight > height);

  const scrollbarSize = getScrollbarSize();

  useEffect(() => {
    if (prevSize.current !== data.length * rowHeight > height) {
      prevSize.current = data.length * rowHeight > height;
      setVerticalScroll(data.length * rowHeight > height);
    }
  }, [data.length, height, rowHeight]);

  // Immediate execution after page load
  // set width for columns from loaded sample data
  useEnhancedEffect(() => {
    let totalWidth = 0;

    for (let i = 0; i < columnRefs.current.length; i += 1) {
      const sampleCell = columnRefs.current[i];

      if (!columnStyle[i]) columnStyle[i] = {};
      columnStyle[i].width = sampleCell.offsetWidth;
      columnStyle[i].left = totalWidth;

      totalWidth += sampleCell.offsetWidth;
    }

    const hasScroll = initializerRef.current.scrollWidth > initializerRef.current.clientWidth;

    setMeta(oldState => ({
      ...oldState,
      isReady: true,
      hasHorizontalScroll: hasScroll,
      hasVerticalScroll: data.length * rowHeight > height,
      rowWidth: totalWidth
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.length, height, rowHeight, setMeta]);

  // Provide extension width for each cells
  // through padding styling
  const sampleHeader = [];
  for (let i = 0; i < columnFlat.length; i += 1) {
    const col = columnFlat[i];

    let width;
    if (col.renderWidth) {
      width = col.renderWidth({ indexCell: i });
    } else if (col.width) {
      width = col.width;
    }

    sampleHeader.push(
      <th
        key={`${uid}-sample-${col.key}`}
        style={{ padding: '0.5rem 1.15rem', whiteSpace: 'nowrap', borderWidth: 1, width }}
      >
        {col.label}
      </th>
    );
  }

  const sampleData = [];
  for (let i = sampleStart; i < sampleEnd; i += 1) {
    const datum = data[i] || {};
    const cells = [];
    for (let ii = 0; ii < columnFlat.length; ii += 1) {
      const col = columnFlat[ii];

      let value = get(datum, col.key) || null;
      if (col.renderCellValue) {
        value = col.renderCellValue({
          record: datum,
          indexRow: i,
          indexCell: ii
        });
      }

      cells.push(
        <td
          key={`${uid}-sample-cell-${i}-${ii}`}
          ref={node => {
            columnRefs.current[ii] = node;
          }}
          style={{ padding: '0.5rem 1rem', whiteSpace: 'nowrap' }}
        >
          {value}
        </td>
      );
    }

    if (hasVerticalScroll) {
      cells.push(
        <td
          key={`${uid}-sample-row-scroll-${i}`}
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
    <Fragment>
      <div style={{ overflow: 'auto' }} ref={initializerRef}>
        <table style={{ width: '100%' }}>
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
      <div className="datagrid__initializer">
        <Spinner mr={2} variantColor="primary.500" /> Setting up table
      </div>
    </Fragment>
  );
};

DGInitializer.displayName = 'DGInitializer';

export { DGInitializer };
