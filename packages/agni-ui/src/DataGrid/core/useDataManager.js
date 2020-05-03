import { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { useComponentSize } from '../../_hooks/useComponentSize';

function useDataManager(data, options) {
  const headerRef = useRef(null);
  const [size, bodyRef] = useComponentSize();
  const [rowWidth, setRowWidth] = useState(() => size.width);
  const [state, setState] = useState(() => {
    return { start: 0, end: 1 };
  });
  const [left, setLeft] = useState(0);

  const { rowHeight, overscan = 2 } = options;

  const getViewCapacity = useCallback(
    containerHeight => {
      if (typeof rowHeight === 'number') {
        return Math.ceil(containerHeight / rowHeight);
      }
      const { start = 0 } = state;
      let sum = 0;
      let capacity = 0;
      for (let i = start; i < data.length; i += 1) {
        const height = rowHeight(i);
        sum += height;
        if (sum >= containerHeight) {
          capacity = i;
          break;
        }
      }
      return capacity - start;
    },
    [data.length, rowHeight, state]
  );

  const getRowHeight = indexRow => {
    if (typeof rowHeight === 'number') {
      return rowHeight;
    }
    return rowHeight(indexRow);
  };

  const getOffset = useCallback(
    scrollTop => {
      if (typeof rowHeight === 'number') {
        return Math.floor(scrollTop / rowHeight) + 1;
      }
      let sum = 0;
      let offset = 0;
      for (let i = 0; i < data.length; i += 1) {
        const height = rowHeight(i);
        sum += height;
        if (sum >= scrollTop) {
          offset = i;
          break;
        }
      }
      return offset + 1;
    },
    [data.length, rowHeight]
  );

  const calculateRange = useCallback(() => {
    const element = bodyRef.current;
    if (element) {
      const offset = getOffset(element.scrollTop);
      const viewCapacity = getViewCapacity(element.clientHeight);

      const from = offset - overscan;
      const to = offset + viewCapacity + overscan;
      const res = { start: from < 0 ? 0 : from, end: to > data.length ? data.length : to };
      setState(res);
    }
  }, [bodyRef, data.length, getOffset, getViewCapacity, overscan]);

  useEffect(() => {
    calculateRange();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [size.width, data.length]);

  const totalHeight = useMemo(() => {
    if (typeof rowHeight === 'number') {
      return data.length * rowHeight;
    }
    return data.reduce((sum, _, index) => sum + rowHeight(index), 0);
  }, [data, rowHeight]);

  const getDistanceTop = index => {
    if (typeof rowHeight === 'number') {
      const height = index * rowHeight;
      return height;
    }
    const height = data.slice(0, index).reduce((sum, _, i) => sum + rowHeight(i), 0);

    return height;
  };

  const scrollTo = index => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = getDistanceTop(index);
      calculateRange();
    }
  };

  const contentCallbackRef = node => {
    bodyRef.current = node;
  };

  const headerCallbackRef = node => {
    headerRef.current = node;
  };

  const onContentScroll = event => {
    event.preventDefault();

    calculateRange();
    headerRef.current.scrollLeft = event.currentTarget.scrollLeft;
    setLeft(event.currentTarget.scrollLeft);
  };

  return {
    data,
    startIndex: state.start,
    endIndex: state.end,
    width: size.width,
    height: size.height,
    totalHeight,
    scrollTo,
    onContentScroll,
    contentCallbackRef,
    contentPaddingTop: getDistanceTop(state.start),
    headerCallbackRef,
    rowWidth,
    setRowWidth,
    left,
    getRowHeight
  };
}

export { useDataManager };
