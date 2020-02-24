import React, { useLayoutEffect, useRef, Fragment, useEffect } from 'react';
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

  const hasVerticalScrollRef = useRef(data.length * rowHeight > height);
  const scrollbarSizeRef = useRef(0);

  useEffect(() => {
    hasVerticalScrollRef.current = data.length * rowHeight > height;
  }, [data.length, height, rowHeight]);

  // Immediate execution after page load
  // set width for columns from loaded sample data
  useLayoutEffect(() => {
    let totalWidth = 0;
    scrollbarSizeRef.current = getScrollbarSize();

    for (let i = 0; i < columnRefs.current.length; i++) {
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
      rowWidth: totalWidth,
      scrollbarSize: scrollbarSizeRef.current
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.length, height, rowHeight, setMeta]);

  // Provide extension width for each cells
  // through padding styling
  const sampleHeader = [];
  for (let i = 0; i < columnFlat.length; i++) {
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
  for (let i = sampleStart; i < sampleEnd; i++) {
    const datum = data[i];
    const cells = [];
    for (let ii = 0; ii < columnFlat.length; ii++) {
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

    if (hasVerticalScrollRef.current) {
      cells.push(
        <td
          key={`${uid}-sample-row-scroll-${i}`}
          style={{
            width: scrollbarSizeRef.current,
            minWidth: scrollbarSizeRef.current,
            maxWidth: scrollbarSizeRef.current
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
              {hasVerticalScrollRef.current && (
                <th
                  style={{
                    width: scrollbarSizeRef.current,
                    minWidth: scrollbarSizeRef.current,
                    maxWidth: scrollbarSizeRef.current
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
