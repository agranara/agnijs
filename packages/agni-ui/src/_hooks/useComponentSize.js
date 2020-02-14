/**
 * Thanks to rehooks
 *
 * Original resource: https://github.com/rehooks/component-size/blob/master/index.js
 */

import { useState, useCallback, useLayoutEffect } from 'react';

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
  const [size, setSize] = useState(() => getSize(ref ? ref.current : {}));

  const handleResize = useCallback(
    function handleResize() {
      if (ref.current) {
        setSize(getSize(ref.current));
      }
    },
    [ref]
  );

  useLayoutEffect(() => {
    if (!ref.current) {
      return;
    }

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
  }, [handleResize, ref]);

  return size;
}

export { useComponentSize };
