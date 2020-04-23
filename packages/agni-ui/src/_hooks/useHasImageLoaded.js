import { useRef, useState, useEffect } from 'react';

const useHasImageLoaded = ({ src, onLoad, onError }) => {
  const isMounted = useRef(true);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    if (src) {
      const image = new window.Image();
      image.src = src;

      image.onload = event => {
        if (isMounted.current) {
          setHasLoaded(true);
          if (onLoad) {
            onLoad(event);
          }
        }
      };

      image.onerror = event => {
        if (isMounted.current) {
          setHasLoaded(false);
          if (onError) {
            onError(event);
          }
        }
      };
    }
  }, [src, onLoad, onError]);

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  return hasLoaded;
};

export { useHasImageLoaded };
