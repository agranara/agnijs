import { useRef, useEffect } from 'react';

/**
 * Returns the previous value of a reference after a component update.
 */
function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref;
}

export { usePrevious };
