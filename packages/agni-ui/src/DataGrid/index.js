/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { useRef, useState, Fragment, useCallback, useEffect } from 'react';
import { useComponentSize } from '../_hooks/useComponentSize';
import { useAutoId } from '../_hooks/useAutoId';
import { Spinner } from '../Spinner';
import { useUiTheme } from '../UiProvider';
import { DataGridContext } from './DataGridContext';
import { DGContainer } from './cores/DGContainer';
import { DGHeader } from './cores/DGHeader';
import { DGContent } from './cores/DGContent';
import { DGInitializer } from './cores/DGInitializer';
import {
  getArrayDepth,
  cancelTimeout,
  requestTimeout,
  getFlatColumns,
  getLastFreezeIndex
} from './util';
import { useSortHandler } from './cores/useSortHandler';

const DataGrid = ({
  data,
  columns,
  getRowDatumStyle,
  sortKey: sortKeyProp,
  sortOrder: sortOrderProp,
  onSortChange,
  rowHeight = 36,
  height = 350,
  sampleStart = 0,
  sampleEnd = 2,
  initialOffsetTop = 0,
  initialOffsetLeft = 0,
  emptyData = 'No data found',
  isHeadless = false,
  rowComponent = 'div',
  cellComponent = 'div'
}) => {
  const uid = useAutoId();
  const theme = useUiTheme();
  const containerRef = useRef(null);
  const itemCountRef = useRef(data.length);
  const columnMetadataRef = useRef({
    depth: getArrayDepth(columns),
    flat: getFlatColumns(columns),
    lastFreeze: getLastFreezeIndex(columns)
  });

  // Timeout ref
  const timeoutIsScroll = useRef(null);

  // Content body ref
  const contentRef = useRef(null);
  const headerRef = useRef(null);

  // Column style cache
  const columnStyleRef = useRef({});

  // Observe width change for data grid
  const { width: containerWidth } = useComponentSize(containerRef);

  // Hooks for sort handler
  const [sortKey, sortOrder, handleSort] = useSortHandler({
    sortKey: sortKeyProp,
    sortOrder: sortOrderProp,
    onSortChange
  });

  // Since we using clone to measure size of columns and cells
  // setup flag to determine ready or not to be rendered for real
  // and determine if grid content has scroll
  const [[isReady, hasScrollHeader, actualWidth], setReady] = useState([false, false, 0]);

  // Observe scroll position
  const [scrollState, setScrollState] = useState(() => {
    return {
      isScrolling: false,
      isRequested: false,
      top: initialOffsetTop,
      topDirection: 'forward',
      left: initialOffsetLeft,
      leftDirection: 'forward'
    };
  });

  // On updated data
  useEffect(() => {
    itemCountRef.current = data.length;
  }, [data.length]);

  // On updated columns
  useEffect(() => {
    columnMetadataRef.current.depth = getArrayDepth(columns);
    columnMetadataRef.current.flat = getFlatColumns(columns);
    columnMetadataRef.current.lastFreeze = getLastFreezeIndex(columns);
  }, [columns]);

  // On updated scroll
  useEffect(() => {
    if (timeoutIsScroll.current !== null) {
      cancelTimeout(timeoutIsScroll.current);
    }

    timeoutIsScroll.current = requestTimeout(() => {
      setScrollState(oldScrollState => ({
        ...oldScrollState,
        isScrolling: false
      }));
    }, 150);
  }, [scrollState.isScrolling]);

  // Handle on table scrolled
  const onScrollBody = useCallback(ev => {
    const {
      clientHeight,
      scrollHeight,
      scrollTop,

      scrollLeft,
      clientWidth,
      scrollWidth
    } = ev.currentTarget;

    setScrollState(oldScrollState => {
      let newScrollState = { ...oldScrollState };

      if (oldScrollState.top !== scrollTop) {
        // Vertical scrolling
        newScrollState.top = Math.max(0, Math.min(scrollTop, scrollHeight - clientHeight));
        newScrollState.topDirection =
          oldScrollState.top < newScrollState.top ? 'forwarded' : 'backward';
        newScrollState.isScrolling = true;
        newScrollState.isRequested = false;
      }

      if (oldScrollState.left !== scrollLeft) {
        // Horizontal scrolling
        newScrollState.left = Math.max(0, Math.min(scrollLeft, scrollWidth - clientWidth));
        newScrollState.leftDirection =
          oldScrollState.left < newScrollState.leftDirection ? 'forward' : 'backward';
        newScrollState.isScrolling = true;
        newScrollState.isRequested = false;

        // When horizontal scroll, set header scroll left offset directly too
        // to make sure no delay when scroll horizontally
        if (headerRef.current) {
          if (headerRef.current.scrollLeft !== newScrollState.left) {
            headerRef.current.scrollLeft = newScrollState.left;
          }
        }

        // Does the same for contentRef
        if (contentRef.current) {
          if (contentRef.current.scrollLeft !== newScrollState.left) {
            contentRef.current.scrollLeft = newScrollState.left;
          }
        }
      }

      // Should be same scroll, do nothing
      return { ...oldScrollState, ...newScrollState };
    });
  }, []);

  const freezeStyle = columnStyleRef.current[columnMetadataRef.current.lastFreeze];

  return (
    <DataGridContext.Provider
      value={{
        uid,
        data,
        columns,
        flatColumns: columnMetadataRef.current.flat,
        containerRef,
        actualWidth,
        width: containerWidth,
        rowHeight,
        itemCount: itemCountRef.current,
        height,
        scrollState,
        setScrollState,
        onScrollBody,
        columnDepth: columnMetadataRef.current.depth,
        columnStyleRef,
        isReady,
        hasScrollHeader,
        setReady,
        sampleStart,
        sampleEnd,
        headerRef,
        contentRef,
        getRowDatumStyle,
        isHeadless
      }}
    >
      <DGContainer
        ref={containerRef}
        height={
          isReady
            ? itemCountRef.current > 0
              ? height
              : rowHeight * (columnMetadataRef.current.depth + 1)
            : 'auto'
        }
      >
        <div css={css({ position: 'fixed', width: 0, height: 0, top: 0, left: 0, outline: 0 })} />
        {!isReady && (
          <Fragment>
            <DGInitializer />
            <div
              css={css({
                padding: 8,
                textAlign: 'center',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              })}
            >
              <Spinner mr={2} variantColor="primary.500" /> Setting up table
            </div>
          </Fragment>
        )}
        {isReady && (
          <Fragment>
            {!isHeadless && (
              <DGHeader sortKey={sortKey} sortOrder={sortOrder} handleSort={handleSort} />
            )}
            {scrollState.left > 0 && hasScrollHeader && (
              <div
                css={css({
                  position: 'absolute',
                  width: freezeStyle ? freezeStyle.width + freezeStyle.left - 1 : 0,
                  height: height - 17,
                  boxShadow: theme.shadows.lg,
                  zIndex: 1
                })}
              />
            )}
            {itemCountRef.current === 0 && (
              <div
                style={{
                  position: 'absolute',
                  top: columnMetadataRef.current.depth * rowHeight,
                  padding: 8,
                  textAlign: 'center',
                  width: actualWidth
                }}
              >
                <em>{emptyData}</em>
              </div>
            )}
            {itemCountRef.current > 0 && (
              <DGContent rowComponent={rowComponent} cellComponent={cellComponent} />
            )}
          </Fragment>
        )}
      </DGContainer>
    </DataGridContext.Provider>
  );
};

DataGrid.displayName = 'DataGrid';

export { DataGrid };
