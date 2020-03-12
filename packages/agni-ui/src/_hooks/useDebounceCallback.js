import { useRef, useCallback, useEffect } from 'react';

/**
 * Thanks to umijs/hooks
 *
 * Original source:
 * https://github.com/umijs/hooks/blob/master/packages/hooks/src/useDebounceFn/index.ts
 */
export function useDebounceCallback({ callback, delay, deps }) {
  const _deps = Array.isArray(deps) ? deps : [];
  const _wait = typeof deps === 'number' ? deps : delay || 0;
  const timer = useRef();

  const fnRef = useRef(callback);

  // Remember the latest callback.
  useEffect(() => {
    fnRef.current = callback;
  }, [callback]);

  const cancel = useCallback(() => {
    if (timer.current) {
      clearTimeout(timer.current);
    }
  }, []);

  const run = useCallback(
    (...args) => {
      cancel();
      timer.current = setTimeout(() => {
        fnRef.current(...args);
      }, _wait);
    },
    [_wait, cancel]
  );

  useEffect(() => {
    run();
    return cancel;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [..._deps, run, cancel]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => cancel, []);

  return [run, cancel];
}
