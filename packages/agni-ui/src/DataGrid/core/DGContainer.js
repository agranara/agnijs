/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { Fragment } from 'react';
import { useDGMetaContext } from '../context/DGMetaContext';
import { dataGridStyle } from '../style';
import { DGInitializer } from './DGInitializer';
import { DGHeader } from './DGHeader';
import { DGFreezeOverlay } from './DGFreezeOverlay';
import { DGContent } from './DGContent';

const DGContainer = ({ sampleStart, sampleEnd }) => {
  const {
    uid,
    itemCount,
    containerRef,
    containerHeight,
    columns,
    columnDepth,
    freezeStyle,
    rowHeight,
    rowWidth,
    isReady,
    isHeadless,
    hasScrollHeader,
    emptyPlaceholder,
    cellComponent,
    rowComponent,
    columnStyle,
    setMeta,
    getRowDatumStyle,
    data,
    columnFlat
  } = useDGMetaContext();

  return (
    <div
      ref={containerRef}
      className="datagrid"
      css={css(dataGridStyle)}
      style={{
        height: isReady ? (itemCount > 0 ? containerHeight : rowHeight * (columnDepth + 1)) : 'auto'
      }}
    >
      {isReady ? (
        <Fragment>
          {!isHeadless && (
            <DGHeader
              uid={uid}
              hasScrollHeader={hasScrollHeader}
              columns={columns}
              columnStyle={columnStyle}
              columnDepth={columnDepth}
              rowWidth={rowWidth}
              rowHeight={rowHeight}
            />
          )}
          <DGFreezeOverlay
            hasScrollHeader={hasScrollHeader}
            freezeStyle={freezeStyle}
            height={containerHeight}
          />
          {itemCount > 0 ? (
            <DGContent
              uid={uid}
              hasScrollHeader={hasScrollHeader}
              isHeadless={isHeadless}
              height={containerHeight}
              rowHeight={rowHeight}
              rowWidth={rowWidth}
              columnFlat={columnFlat}
              columnDepth={columnDepth}
              columnStyle={columnStyle}
              rowComponent={rowComponent}
              cellComponent={cellComponent}
              getRowDatumStyle={getRowDatumStyle}
              itemCount={itemCount}
              data={data}
            />
          ) : (
            <div
              className="datagrid__empty"
              style={{
                top: columnDepth * rowHeight,
                width: rowWidth
              }}
            >
              <em>{emptyPlaceholder}</em>
            </div>
          )}
        </Fragment>
      ) : (
        <DGInitializer
          uid={uid}
          data={data}
          columnFlat={columnFlat}
          columnStyle={columnStyle}
          sampleStart={sampleStart}
          sampleEnd={sampleEnd}
          setMeta={setMeta}
        />
      )}
    </div>
  );
};

DGContainer.displayName = 'DGContainer';

export { DGContainer };
