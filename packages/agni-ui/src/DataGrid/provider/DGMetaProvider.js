import React, { useRef, useState, useMemo, useEffect } from 'react';
import { DGMetaContext } from '../context/DGMetaContext';
import { useAutoId } from '../../_hooks/useAutoId';
import { useComponentSize } from '../../_hooks/useComponentSize';
import { getArrayDepth, getFlatColumns, getLastFreezeIndex } from '../util';

const initialMeta = {
  isReady: false,
  hasHorizontalScroll: false,
  hasVerticalScroll: false,
  rowWidth: 0,
  scrollbarSize: 17
};

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
  cellComponent,
  isLoading,
  loadingData
}) => {
  const uid = useAutoId();

  const cachedContainerHeight = useRef(0);
  const prevLoading = useRef(isLoading);

  const columnStyleRef = useRef({});

  // Observe width change for data grid
  const [{ width: containerWidth }, containerRef] = useComponentSize();

  // Since we using clone to measure size of columns and cells
  // setup flag to determine ready or not to be rendered for real
  // and determine if grid content has scroll
  const [metaState, setMeta] = useState(() => initialMeta);

  // Listen to `isLoading` props, set `isReady` back to false
  // when isLoading is true
  // triggering 'isReady' to true triggered from `DGInitializer`
  useEffect(() => {
    if (isLoading !== prevLoading.current) {
      prevLoading.current = isLoading;
      setMeta(oldMeta => ({
        ...oldMeta,
        ...initialMeta
      }));
    }
  }, [isLoading]);

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

  // Memoize recursive function
  const columnFlat = useMemo(() => {
    return getFlatColumns(columns);
  }, [columns]);

  return (
    <DGMetaContext.Provider
      value={{
        data,
        itemCount: data.length,
        isReady: metaState.isReady,
        hasHorizontalScroll: metaState.hasHorizontalScroll,
        hasVerticalScroll: metaState.hasVerticalScroll,
        rowWidth: metaState.rowWidth,
        scrollbarSize: metaState.scrollbarSize,
        rowHeight,
        getRowDatumStyle,
        cellComponent,
        rowComponent,
        columns,
        columnDepth: getArrayDepth(columns),
        columnFlat,
        columnFreeze: getLastFreezeIndex(columns),
        columnStyle: columnStyleRef.current,
        containerWidth,
        containerHeight,
        containerRef,
        setMeta,
        uid,
        isHeadless,
        emptyPlaceholder,
        isLoading,
        loadingData
      }}
    >
      {children}
    </DGMetaContext.Provider>
  );
};

DGMetaProvider.displayName = 'DGMetaProvider';

export { DGMetaProvider };
