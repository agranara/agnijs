import { useState, useRef, useCallback, useEffect } from 'react';
import { useDebounceCallback } from './useDebounceCallback';

const isEquality = (prev, next) => prev === next;

export function useDebounceValue({ value, delay, equalityFn, maxWait, leading, trailing }) {
  const isEqual = equalityFn ? equalityFn : isEquality;

  const [state, dispatch] = useState(value);
  const usedCallback = useCallback(val => dispatch(val), []);
  const [callback, cancel, callPending] = useDebounceCallback({
    callback: usedCallback,
    delay,
    maxWait,
    leading,
    trailing
  });
  const previousValue = useRef(value);

  useEffect(() => {
    // We need to use this condition otherwise we will run debounce timer for the first render (including maxWait option)
    if (!isEqual(previousValue.current, value)) {
      callback(value);
      previousValue.current = value;
    }
  }, [value, callback, isEqual]);

  return [state, cancel, callPending];
}
