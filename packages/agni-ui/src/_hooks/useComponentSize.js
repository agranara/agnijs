/**
 * Thanks to zee coder
 *
 * Original resource:
 * https://github.com/ZeeCoder/use-resize-observer/blob/master/src/index.ts
 */
import { useState, useRef, useEffect, useMemo } from 'react';
import { ResizeObserver } from '@juggle/resize-observer';

export function useComponentSize(refProp) {
  // `defaultRef` Has to be non-conditionally declared here whether or not it'll
  // be used as that's how hooks work.
  // @see https://reactjs.org/docs/hooks-rules.html#explanation
  const defaultRef = useRef(null);

  const ref = refProp || defaultRef;
  const [size, setSize] = useState({
    width: undefined,
    height: undefined
  });

  // Using a ref to track the previous width / height to avoid unnecessary renders
  const previous = useRef({
    width: undefined,
    height: undefined
  });

  useEffect(() => {
    if (typeof ref !== 'object' || ref === null || !(ref.current instanceof Element)) {
      return;
    }

    const element = ref.current;
    const resizeObserver = new ResizeObserver(entries => {
      if (!Array.isArray(entries)) {
        return;
      }
      if (!entries.length) {
        return;
      }

      const entry = entries[0];

      // `Math.round` is in line with how CSS resolves sub-pixel values
      const newWidth = Math.round(entry.contentRect.width);
      const newHeight = Math.round(entry.contentRect.height);
      // const newWidth = Math.round(entry.target.clientWidth);
      // const newHeight = Math.round(entry.target.clientHeight);
      if (previous.current.width !== newWidth || previous.current.height !== newHeight) {
        const newSize = { width: newWidth, height: newHeight };
        previous.current.width = newWidth;
        previous.current.height = newHeight;
        setSize(newSize);
      }
    });

    resizeObserver.observe(element);

    // eslint-disable-next-line consistent-return
    return () => {
      resizeObserver.unobserve(element);
    };
  }, [ref]);

  return useMemo(() => [size, ref], [ref, size]);
}
