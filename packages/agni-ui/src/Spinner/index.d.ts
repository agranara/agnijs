import { BoxProps } from '../Box';
import { VariantColor } from '../theme';

interface ISpinnerProps {
  label?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  variantColor?: VariantColor;
}

type SpinnerProps = ISpinnerProps & Omit<BoxProps, 'size'>;

export const Spinner: React.FC<SpinnerProps>;
