/** @jsx jsx */
import { jsx } from '@emotion/core';
import { forwardRef } from 'react';
import { Box } from '../Box';
import { useHasImageLoaded } from './useHasImageLoaded';

const NativeImage = forwardRef(({ htmlWidth, htmlHeight, alt, ...props }, ref) => (
  <img width={htmlWidth} height={htmlHeight} ref={ref} alt={alt} {...props} />
));

const Image = forwardRef(({ src, fallbackSrc, onError, onLoad, ignoreFallback, ...props }, ref) => {
  const hasLoaded = useHasImageLoaded({ src, onLoad, onError });
  let imageProps;
  if (ignoreFallback) {
    imageProps = { src, onLoad, onError };
  } else {
    imageProps = { src: hasLoaded ? src : fallbackSrc };
  }
  return <Box as={NativeImage} ref={ref} {...imageProps} {...props} />;
});

export { Image };
export default Image;
