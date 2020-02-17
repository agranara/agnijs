import React, { useCallback, useRef, useState, useEffect } from 'react';
import isEqual from 'fast-deep-equal/es6/react';
import { DGScrollContext } from '../context/DGScrollContext';

import { cancelTimeout, requestTimeout } from '../util';

const DGScrollProvider = ({ children, initialOffsetTop, initialOffsetLeft }) => {
  // Reference header and content
  const headerRef = useRef(null);
  const contentRef = useRef(null);

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

  // Cached scrollstate
  const prevScrollState = useRef(scrollState);

  // Timeout ref
  const timeoutIsScroll = useRef(null);

  // Clean timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutIsScroll.current !== null) {
        cancelTimeout(timeoutIsScroll.current);
      }
    };
  }, []);

  // Reset scrolling function
  const resetScroll = useCallback(() => {
    if (timeoutIsScroll.current !== null) {
      cancelTimeout(timeoutIsScroll.current);
    }

    timeoutIsScroll.current = requestTimeout(() => {
      setScrollState(oldScrollState => ({
        ...oldScrollState,
        isScrolling: false
      }));
    }, 150);
  }, []);

  const getNewScrollState = useCallback(
    ({ scrollTop, scrollHeight, clientHeight, scrollLeft, scrollWidth, clientWidth }) => {
      let newScrollState = { ...prevScrollState.current };

      if (prevScrollState.current.top !== scrollTop) {
        // Vertical scrolling
        newScrollState.top = Math.max(0, Math.min(scrollTop, scrollHeight - clientHeight));
        newScrollState.topDirection =
          prevScrollState.current.top < newScrollState.top ? 'forwarded' : 'backward';
        newScrollState.isScrolling = true;
        newScrollState.isRequested = false;
      }

      if (prevScrollState.current.left !== scrollLeft) {
        // Horizontal scrolling
        newScrollState.left = Math.max(0, Math.min(scrollLeft, scrollWidth - clientWidth));
        newScrollState.leftDirection =
          prevScrollState.current.left < newScrollState.leftDirection ? 'forward' : 'backward';
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
      return { ...prevScrollState.current, ...newScrollState };
    },
    []
  );

  // Handle on table scrolled
  const onScrollBody = useCallback(
    ev => {
      const {
        clientHeight,
        scrollHeight,
        scrollTop,
        scrollLeft,
        clientWidth,
        scrollWidth
      } = ev.currentTarget;

      const newScrollState = getNewScrollState({
        clientHeight,
        clientWidth,
        scrollWidth,
        scrollHeight,
        scrollLeft,
        scrollTop
      });
      if (!isEqual(prevScrollState.current, newScrollState)) {
        setScrollState(oldScrollState => ({ ...oldScrollState, ...newScrollState }));
        prevScrollState.current = newScrollState;
        resetScroll();
      }
    },
    [resetScroll, getNewScrollState]
  );

  const context = {
    ...scrollState,
    onScrollBody,
    headerRef,
    contentRef
  };

  return <DGScrollContext.Provider value={context}>{children}</DGScrollContext.Provider>;
};

DGScrollProvider.displayName = 'DGScrollProvider';

export { DGScrollProvider };
