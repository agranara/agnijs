/* eslint-disable prefer-destructuring */
import { useRef, useCallback, useEffect } from 'react';

export function useDebounceCallback({ callback, delay, options = {} }) {
  const maxWait = options.maxWait;
  const maxWaitHandler = useRef(null);
  const maxWaitArgs = useRef([]);

  const leading = options.leading;
  const trailing = options.trailing === undefined ? true : options.trailing;
  const leadingCall = useRef(false);

  const functionTimeoutHandler = useRef(null);
  const isComponentUnmounted = useRef(false);

  const debouncedFunction = useRef(callback);
  debouncedFunction.current = callback;

  const cancelDebouncedCallback = useCallback(() => {
    clearTimeout(functionTimeoutHandler.current);
    clearTimeout(maxWaitHandler.current);
    maxWaitHandler.current = null;
    maxWaitArgs.current = [];
    functionTimeoutHandler.current = null;
    leadingCall.current = false;
  }, []);

  useEffect(
    () => () => {
      // we use flag, as we allow to call callPending outside the hook
      isComponentUnmounted.current = true;
    },
    []
  );

  const debouncedCallback = useCallback(
    (...args) => {
      maxWaitArgs.current = args;
      clearTimeout(functionTimeoutHandler.current);
      if (leadingCall.current) {
        leadingCall.current = false;
      }
      if (!functionTimeoutHandler.current && leading && !leadingCall.current) {
        debouncedFunction.current(...args);
        leadingCall.current = true;
      }

      functionTimeoutHandler.current = setTimeout(() => {
        let shouldCallFunction = true;
        if (leading && leadingCall.current) {
          shouldCallFunction = false;
        }
        cancelDebouncedCallback();

        if (!isComponentUnmounted.current && trailing && shouldCallFunction) {
          debouncedFunction.current(...args);
        }
      }, delay);

      if (maxWait && !maxWaitHandler.current && trailing) {
        maxWaitHandler.current = setTimeout(() => {
          const maxWaitArg = maxWaitArgs.current;
          cancelDebouncedCallback();

          if (!isComponentUnmounted.current) {
            debouncedFunction.current.apply(null, maxWaitArg);
          }
        }, maxWait);
      }
    },
    [maxWait, delay, cancelDebouncedCallback, leading, trailing]
  );

  const callPending = useCallback(() => {
    // Call pending callback only if we have anything in our queue
    if (!functionTimeoutHandler.current) {
      return;
    }

    debouncedFunction.current.apply(null, maxWaitArgs.current);
    cancelDebouncedCallback();
  }, [cancelDebouncedCallback]);

  return [debouncedCallback, cancelDebouncedCallback, callPending];
}
