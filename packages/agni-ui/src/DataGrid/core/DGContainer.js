/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { Fragment, memo } from 'react';
import cn from 'classnames';
import { Spinner } from '../../Spinner';
import { useDGMetaContext } from '../context/DGMetaContext';
import { useUiTheme } from '../../UiProvider';
import { dataGridStyle, fullAbsoluteCss } from '../style';
import { DGInitializer } from './DGInitializer';
import { DGHeader } from './DGHeader';
import { DGFreezeOverlay } from './DGFreezeOverlay';
import { DGContent } from './DGContent';

const DGContainer = memo(({ sampleStart, sampleEnd, className }) => {
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
    scrollbarSize,
    emptyPlaceholder,
    cellComponent,
    rowComponent,
    setMeta,
    getRowDatumStyle,
    isLoading,
    loadingData
  } = useDGMetaContext();
  const theme = useUiTheme();

  const contentOffsetTop = !isHeadless ? columnDepth * rowHeight : 0;

  return (
    <div
      ref={containerRef}
      className={cn(['datagrid', className])}
      css={dataGridStyle}
      style={{
        height: isReady
          ? itemCount > 0
            ? containerHeight
            : rowHeight * (columnDepth + 1)
          : 'auto',
        pointerEvents: isLoading ? 'none' : undefined
      }}
    >
      {isLoading && (
        <div css={css([fullAbsoluteCss])}>
          <div
            css={{
              backgroundColor: theme.colors.gray['50'],
              opacity: 0.4,
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              zIndex: 4
            }}
          />
          <div
            css={css([
              fullAbsoluteCss,
              {
                paddingTop: contentOffsetTop + 4,
                zIndex: 5,
                opacity: 1,
                textAlign: 'center'
              }
            ])}
          >
            {loadingData || (
              <div
                css={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '100%'
                }}
              >
                <Spinner
                  variantColor="primary.500"
                  size="lg"
                  borderWidth="3px !important"
                  fontWeight="bold"
                />
              </div>
            )}
          </div>
        </div>
      )}
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
              scrollbarSize={scrollbarSize}
            />
          )}
          <DGFreezeOverlay
            hasHorizontalScroll={hasHorizontalScroll}
            freezeStyle={columnStyle[columnFreeze]}
            height={containerHeight}
            scrollbarSize={scrollbarSize}
          />
          {itemCount > 0 && (
            <DGContent
              uid={uid}
              // hasVerticalScroll={hasVerticalScroll}
              contentOffsetTop={contentOffsetTop}
              height={containerHeight}
              rowHeight={rowHeight}
              rowWidth={rowWidth}
              columnFlat={columnFlat}
              columnStyle={columnStyle}
              rowComponent={rowComponent}
              cellComponent={cellComponent}
              getRowDatumStyle={getRowDatumStyle}
              itemCount={itemCount}
              data={data}
            />
          )}
          {itemCount < 1 && !isLoading && (
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
          isLoading={isLoading}
        />
      )}
    </div>
  );
});

DGContainer.displayName = 'DGContainer';

export { DGContainer };
