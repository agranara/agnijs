/** @jsx jsx */
import { jsx } from '@emotion/core';
import { memo, useMemo } from 'react';
import cn from 'classnames';
import { useAutoId } from '../_hooks/useAutoId';
import { getScrollbarSize } from '../_utils/getScrollbarSize';

import { DGColumnContext } from './context/DGColumnContext';
import { DGDataContext } from './context/DGDataContext';
import { DGMetaContext } from './context/DGMetaContext';
import { DGSortContext } from './context/DGSortContext';

import { useColumnManager } from './core/useColumnManager';
import { useDataManager } from './core/useDataManager';
import { useSortManager } from './core/useSortManager';

import { dataGridStyle } from './style';

import { DGShadow } from './core/DGShadow';
import { DGHeader } from './core/DGHeader';
import { DGBody } from './core/DGBody';
import { DGFrozen } from './core/DGFrozen';
import { DGLoading } from './core/DGLoading';

const DataGrid = memo(
  ({
    data,
    columns,
    getRowDatumStyle,
    sortKey,
    sortOrder,
    onSortChange,
    rowHeight,
    height,
    heightByItem,
    sampleStart,
    sampleEnd,
    emptyData,
    isHeadless,
    isLoading,
    loadingData,
    rowComponent,
    cellComponent,
    className
  }) => {
    const uid = useAutoId();
    const scrollbarSize = getScrollbarSize();

    const columnManager = useColumnManager(columns);
    const dataManager = useDataManager(data, {
      rowHeight,
      height,
      heightByItem
    });

    const sortManager = useSortManager(sortKey, sortOrder, onSortChange);

    const itemCount = Array.isArray(data) ? data.length : 0;

    const containerHeight = useMemo(() => {
      if (height) return height;

      const hasHorizontalScroll = dataManager.rowWidth > dataManager.width;

      const addPixel = hasHorizontalScroll ? scrollbarSize : 0;
      return Math.min(heightByItem || 10, data.length) * rowHeight + addPixel;
    }, [
      data.length,
      dataManager.rowWidth,
      dataManager.width,
      height,
      heightByItem,
      rowHeight,
      scrollbarSize
    ]);

    const hasVerticalScroll = useMemo(() => {
      return dataManager.totalHeight !== containerHeight;
    }, [dataManager.totalHeight, containerHeight]);

    const headerHeight = useMemo(() => {
      return columnManager.columnDepth * 36;
    }, [columnManager.columnDepth]);

    return (
      <DGColumnContext.Provider value={columnManager}>
        <DGDataContext.Provider value={{ ...dataManager, hasVerticalScroll }}>
          <DGSortContext.Provider value={sortManager}>
            <DGMetaContext.Provider
              value={{
                rowComponent,
                cellComponent,
                sampleStart,
                sampleEnd,
                isHeadless,
                getRowDatumStyle,
                scrollbarSize,
                containerHeight,
                uid
              }}
            >
              <div className={cn(['datagrid', className])} css={dataGridStyle}>
                {!isHeadless && <DGHeader />}
                <DGFrozen
                  placement="left"
                  left={dataManager.left}
                  rowWidth={dataManager.rowWidth}
                  width={dataManager.width}
                  getFrozenLeftWidth={columnManager.getFrozenLeftWidth}
                  scrollbarSize={scrollbarSize}
                  containerHeight={containerHeight}
                />
                {isLoading && <DGLoading loadingData={loadingData} headerHeight={headerHeight} />}
                {itemCount > 0 && <DGBody />}
                {itemCount === 0 && (
                  <div className="datagrid__empty">
                    <em>{emptyData}</em>
                  </div>
                )}
                <DGShadow />
              </div>
            </DGMetaContext.Provider>
          </DGSortContext.Provider>
        </DGDataContext.Provider>
      </DGColumnContext.Provider>
    );
  }
);

DataGrid.defaultProps = {
  rowHeight: 36,
  sampleStart: 0,
  sampleEnd: 2,
  initialOffsetTop: 0,
  initialOffsetLeft: 0,
  emptyData: 'No data found',
  isHeadless: false,
  isLoading: false,
  rowComponent: 'div',
  cellComponent: 'div'
};

DataGrid.displayName = 'DataGrid';

export { DataGrid };
