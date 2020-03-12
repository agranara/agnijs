/**
 * Thanks to umijs/hooks
 *
 * Original resource:
 * https://github.com/umijs/hooks/blob/master/packages/hooks/src/useSize/index.ts
 */
import { useState, useRef, useLayoutEffect } from 'react';
import ResizeObserver from 'resize-observer-polyfill';

export function useComponentSize(...args) {
  const hasPassedInElement = args.length === 1;
  const arg = useRef(args[0]);
  [arg.current] = args;
  const element = useRef();
  const [state, setState] = useState(() => {
    const initDOM = typeof arg.current === 'function' ? arg.current() : arg.current;
    return {
      width: (initDOM || {}).clientWidth,
      height: (initDOM || {}).clientHeight
    };
  });

  useLayoutEffect(() => {
    const passedInElement = typeof arg.current === 'function' ? arg.current() : arg.current;
    const targetElement = hasPassedInElement ? passedInElement : element.current;
    if (!targetElement) {
      return () => {};
    }

    const resizeObserver = new ResizeObserver(entries => {
      entries.forEach(entry => {
        setState({
          width: entry.target.clientWidth,
          height: entry.target.clientHeight
        });
      });
    });

    resizeObserver.observe(targetElement);
    return () => {
      resizeObserver.disconnect();
    };
  }, [hasPassedInElement]);

  if (hasPassedInElement) {
    return [state];
  }
  return [state, element];
}
