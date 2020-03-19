import { BoxProps } from '../Box';

interface ISpinnerProps {
  /**
   * Hidden label for accessibility purpose
   * (WA-ARIA label)
   */
  label?: string;
  /**
   * Spinner size
   */
  size?: 'xs' | 'sm' | 'md' | 'lg';
  /**
   * Variant color with its density as defined inside theme
   * eg: 'primary.500', 'warning.50', 'danger.100', black, etc
   */
  variantColor?: string;
}

type SpinnerProps = ISpinnerProps & Omit<BoxProps, 'size'>;

export const Spinner: React.FC<SpinnerProps>;
