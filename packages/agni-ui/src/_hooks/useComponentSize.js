/**
 * Thanks to rehooks
 *
 * Original resource: https://github.com/rehooks/component-size/blob/master/index.js
 */

import { useState, useLayoutEffect } from 'react';
import isEqual from 'fast-deep-equal/es6/react';

function getSize(el) {
  if (!el) {
    return {
      width: 0,
      height: 0
    };
  }

  return {
    width: el.offsetWidth,
    height: el.offsetHeight
  };
}

function useComponentSize(ref) {
  const [size, setSize] = useState(() => {
    return ref ? getSize(ref.current) : getSize();
  });

  useLayoutEffect(() => {
    if (!ref.current) {
      return;
    }

    const handleResize = () => {
      if (ref.current) {
        setSize(oldSize => {
          const result = getSize(ref.current);
          if (isEqual(oldSize, result)) return oldSize;

          return {
            ...oldSize,
            ...getSize(ref.current)
          };
        });
      }
    };

    const node = ref.current;

    handleResize();

    if (typeof ResizeObserver === 'function') {
      let resizeObserver = new ResizeObserver(function() {
        handleResize();
      });
      resizeObserver.observe(node);

      return () => {
        resizeObserver.disconnect(node);
        resizeObserver = null;
      };
    } else {
      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }
  }, [ref]);

  return [size.width, size.height];
}

export { useComponentSize };
