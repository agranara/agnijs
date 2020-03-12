import { useState } from 'react';
import { useDebounceCallback } from './useDebounceCallback';

export function useDebounceValue({ value, delay }) {
  const [state, dispatch] = useState(value);

  useDebounceCallback({
    callback: () => {
      dispatch(value);
    },
    deps: [value],
    delay
  });

  return [state];
}
