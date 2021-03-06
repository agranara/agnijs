import React from 'react';
import { DGMetaProvider } from './provider/DGMetaProvider';
import { DGScrollProvider } from './provider/DGScrollProvider';
import { DGSortProvider } from './provider/DGSortProvider';
import { DGContainer } from './core/DGContainer';

const DataGrid = React.memo(
  ({
    data,
    columns,
    getRowDatumStyle,
    sortKey,
    sortOrder,
    onSortChange,
    rowHeight = 36,
    height,
    heightByItem,
    sampleStart = 0,
    sampleEnd = 2,
    initialOffsetTop = 0,
    initialOffsetLeft = 0,
    emptyData = 'No data found',
    isHeadless = false,
    isLoading = false,
    loadingData,
    rowComponent = 'div',
    cellComponent = 'div',
    className
  }) => {
    return (
      <DGMetaProvider
        columns={columns}
        data={data}
        height={height}
        heightByItem={heightByItem}
        rowHeight={rowHeight}
        emptyData={emptyData}
        isHeadless={isHeadless}
        rowComponent={rowComponent}
        cellComponent={cellComponent}
        isLoading={isLoading}
        loadingData={loadingData}
        getRowDatumStyle={getRowDatumStyle}
      >
        <DGScrollProvider initialOffsetLeft={initialOffsetLeft} initialOffsetTop={initialOffsetTop}>
          <DGSortProvider sortKey={sortKey} sortOrder={sortOrder} onSortChange={onSortChange}>
            <DGContainer className={className} sampleStart={sampleStart} sampleEnd={sampleEnd} />
          </DGSortProvider>
        </DGScrollProvider>
      </DGMetaProvider>
    );
  }
);

DataGrid.displayName = 'DataGrid';

export { DataGrid };
