/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { Fragment } from 'react';
import cn from 'classnames';
import { useDGMetaContext } from '../context/DGMetaContext';
import { dataGridStyle } from '../style';
import { DGInitializer } from './DGInitializer';
import { DGHeader } from './DGHeader';
import { DGFreezeOverlay } from './DGFreezeOverlay';
import { DGContent } from './DGContent';

const DGContainer = ({ sampleStart, sampleEnd, className }) => {
  const {
    uid,
    data,
    itemCount,
    containerRef,
    containerHeight,
    columns,
    columnDepth,
    columnStyle,
    columnFlat,
    columnFreeze,
    rowHeight,
    rowWidth,
    isReady,
    isHeadless,
    hasHorizontalScroll,
    hasVerticalScroll,
    emptyPlaceholder,
    cellComponent,
    rowComponent,
    setMeta,
    getRowDatumStyle
  } = useDGMetaContext();

  return (
    <div
      ref={containerRef}
      className={cn(['datagrid', className])}
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
              hasVerticalScroll={hasVerticalScroll}
              columns={columns}
              columnStyle={columnStyle}
              columnDepth={columnDepth}
              rowWidth={rowWidth}
              rowHeight={rowHeight}
            />
          )}
          <DGFreezeOverlay
            hasHorizontalScroll={hasHorizontalScroll}
            freezeStyle={columnStyle[columnFreeze]}
            height={containerHeight}
          />
          {itemCount > 0 ? (
            <DGContent
              uid={uid}
              // hasVerticalScroll={hasVerticalScroll}
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
          rowHeight={rowHeight}
          height={containerHeight}
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

DGContainer.whyDidYouRender = true;

export { DGContainer };
