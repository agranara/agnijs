import React, { useRef, useEffect, useState, useCallback } from 'react';
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
  emptyData,
  getRowDatumStyle,
  rowComponent,
  cellComponent
}) => {
  const uid = useAutoId();

  const containerRef = useRef(null);

  const dataRef = useRef({
    data,
    itemCount: data.length,
    emptyPlaceholder: emptyData
  });

  const columnRef = useRef({
    columns: columns,
    columnDepth: getArrayDepth(columns),
    columnFlat: getFlatColumns(columns),
    columnFreeze: getLastFreezeIndex(columns),
    columnStyle: {}
  });

  // Observe width change for data grid
  const { width: containerWidth } = useComponentSize(containerRef);

  // Since we using clone to measure size of columns and cells
  // setup flag to determine ready or not to be rendered for real
  // and determine if grid content has scroll
  const [metaState, setMeta] = useState(() => ({
    isReady: false,
    hasHorizontalScroll: false,
    hasVerticalScroll: false,
    rowWidth: 0
  }));

  const getContainerHeight = useCallback(() => {
    if (height) return height;

    const addItem = !isHeadless ? getArrayDepth(columns) : 0;
    const addPixel = metaState.hasHorizontalScroll ? 17 : 0;

    return (Math.min(heightByItem || 10, data.length) + addItem) * rowHeight + addPixel;
  }, [
    height,
    isHeadless,
    columns,
    metaState.hasHorizontalScroll,
    heightByItem,
    rowHeight,
    data.length
  ]);

  const tableRef = useRef({
    containerHeight: getContainerHeight(),
    rowHeight,
    rowComponent,
    cellComponent,
    getRowDatumStyle
  });

  // Update cache accordingly
  useEffect(() => {
    dataRef.current.itemCount = data.length;
  }, [data.length]);

  useEffect(() => {
    dataRef.current.data = data;
  }, [data]);

  useEffect(() => {
    dataRef.current.emptyPlaceholder = emptyData;
  }, [emptyData]);

  useEffect(() => {
    columnRef.current.columns = columns;
    columnRef.current.columnDepth = getArrayDepth(columns);
    columnRef.current.columnFlat = getFlatColumns(columns);
    columnRef.current.columnFreeze = getLastFreezeIndex(columns);
  }, [columns]);

  useEffect(() => {
    tableRef.current.containerHeight = getContainerHeight();
  }, [getContainerHeight]);

  useEffect(() => {
    tableRef.current.rowHeight = rowHeight;
  }, [rowHeight]);

  useEffect(() => {
    tableRef.current.rowComponent = rowComponent;
  }, [rowComponent]);

  useEffect(() => {
    tableRef.current.cellComponent = cellComponent;
  }, [cellComponent]);

  useEffect(() => {
    tableRef.current.getRowDatumStyle = getRowDatumStyle;
  }, [getRowDatumStyle]);

  const freezeStyle = columnRef.current.columnStyle[columnRef.current.columnFreeze];
  const context = {
    ...dataRef.current,
    ...columnRef.current,
    ...tableRef.current,
    ...metaState,
    containerWidth,
    containerRef,
    setMeta,
    uid,
    freezeStyle,
    isHeadless
  };

  return <DGMetaContext.Provider value={context}>{children}</DGMetaContext.Provider>;
};

DGMetaProvider.displayName = 'DGMetaProvider';

export { DGMetaProvider };
