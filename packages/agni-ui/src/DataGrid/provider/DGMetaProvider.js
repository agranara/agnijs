import React, { useRef, useState, useMemo } from 'react';
import { DGMetaContext } from '../context/DGMetaContext';
import { useAutoId } from '../../_hooks/useAutoId';
import { useComponentSize } from '../../_hooks/useComponentSize';
import { getArrayDepth, getFlatColumns, getLastFreezeIndex } from '../util';

const DGMetaProvider = ({
  children,
  isHeadless,
  columns,
  data,
  height,
  heightByItem,
  rowHeight,
  emptyData: emptyPlaceholder,
  getRowDatumStyle,
  rowComponent,
  cellComponent
}) => {
  const uid = useAutoId();

  const containerRef = useRef(null);
  const cachedContainerHeight = useRef(0);

  const columnStyleRef = useRef({});

  // Observe width change for data grid
  const [containerWidth] = useComponentSize(containerRef);

  // Since we using clone to measure size of columns and cells
  // setup flag to determine ready or not to be rendered for real
  // and determine if grid content has scroll
  const [metaState, setMeta] = useState(() => ({
    isReady: false,
    hasHorizontalScroll: false,
    hasVerticalScroll: false,
    rowWidth: 0,
    scrollbarSize: 17
  }));

  const memoizeData = useMemo(() => {
    return {
      data,
      itemCount: data.length
    };
  }, [data]);

  const memoizedColumn = useMemo(() => {
    return {
      columns,
      columnDepth: getArrayDepth(columns),
      columnFlat: getFlatColumns(columns),
      columnFreeze: getLastFreezeIndex(columns)
    };
  }, [columns]);

  const getContainerHeight = () => {
    if (height) return height;

    const addItem = !isHeadless ? getArrayDepth(columns) : 0;
    const addPixel = metaState.hasHorizontalScroll ? metaState.scrollbarSize : 0;

    const res = (Math.min(heightByItem || 10, data.length) + addItem) * rowHeight + addPixel;

    if (res !== cachedContainerHeight.current) {
      cachedContainerHeight.current = res;
    }
    return cachedContainerHeight.current;
  };

  const containerHeight = getContainerHeight();

  const context = {
    data: memoizeData.data,
    itemCount: memoizeData.itemCount,
    isReady: metaState.isReady,
    hasHorizontalScroll: metaState.hasHorizontalScroll,
    hasVerticalScroll: metaState.hasVerticalScroll,
    rowWidth: metaState.rowWidth,
    scrollbarSize: metaState.scrollbarSize,
    rowHeight,
    getRowDatumStyle,
    cellComponent,
    rowComponent,
    columns: memoizedColumn.columns,
    columnFlat: memoizedColumn.columnFlat,
    columnFreeze: memoizedColumn.columnFreeze,
    columnDepth: memoizedColumn.columnDepth,
    columnStyle: columnStyleRef.current,
    containerWidth,
    containerHeight,
    containerRef,
    setMeta,
    uid,
    isHeadless,
    emptyPlaceholder
  };

  return <DGMetaContext.Provider value={context}>{children}</DGMetaContext.Provider>;
};

DGMetaProvider.displayName = 'DGMetaProvider';

export { DGMetaProvider };
