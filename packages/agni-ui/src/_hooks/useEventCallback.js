import { useCallback, useRef } from 'react';
import { useEnhancedEffect } from './useEnhancedEffect';

/**
 * Keep in track
 * https://github.com/facebook/react/issues/14099#issuecomment-440013892
 */

function useEventCallback(fn) {
  const ref = useRef(fn);
  useEnhancedEffect(() => {
    ref.current = fn;
  });
  return useCallback((...args) => (0, ref.current)(...args), []);
}

export { useEventCallback };
