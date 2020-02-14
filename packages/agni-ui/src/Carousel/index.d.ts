import { PseudoBoxProps } from '../PseudoBox';

type CarouselItemProps = {
  index?: number | string;
  className?: string;
};

export const CarouselItem: React.ForwardRefExoticComponent<CarouselItemProps>;

interface ICarouselProps {
  className?: string;
  autoPlay?: boolean;
  duration?: number;
  showControl?: boolean;
  showIndicator?: boolean;
  placement?: 'bottom' | 'top' | 'left' | 'right';
}

type CarouselProps = ICarouselProps & PseudoBoxProps;

export const Carousel: React.FC<CarouselProps>;
