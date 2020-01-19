import { BoxProps } from '../Box';

interface ISpinnerProps {
  label?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg';
}

type SpinnerProps = ISpinnerProps & Omit<BoxProps, 'size'>;

declare const Spinner: React.FC<SpinnerProps>;

export default Spinner;
