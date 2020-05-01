import { useState, useCallback, useRef, useEffect } from 'react';
import { useDebounceCallback } from './useDebounceCallback';

function valueEquality(left, right) {
  return left === right;
}

export function useDebounceValue({ value, delay, options = {} }) {
  const eq = options && options.equalityFn ? options.equalityFn : valueEquality;

  const [state, dispatch] = useState(value);

  const callback = useCallback(val => dispatch(val), []);

  const [cb, cancel, callPending] = useDebounceCallback({
    callback,
    delay,
    options
  });
  const previousValue = useRef(value);

  useEffect(() => {
    // We need to use this condition otherwise we will run debounce timer for the first render (including maxWait option)
    if (!eq(previousValue.current, value)) {
      cb(value);
      previousValue.current = value;
    }
  }, [value, cb, eq]);

  return [state, cancel, callPending];
}
