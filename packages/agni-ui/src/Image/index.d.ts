import { BoxProps } from '../Box';

interface IImageProps {
  src?: string;
  fallbackSrc?: string;
  ignoreFallback?: boolean;
  onLoad?: (ev: Event) => void;
  onError?: (ev: Event | string) => void;
}

type ImageProps = IImageProps & BoxProps;

export const Image: React.ForwardRefExoticComponent<ImageProps>;
