import { PseudoBoxProps } from '../PseudoBox';

interface IInputTextProps {
  isFocus?: boolean;
  isFullWidth?: boolean;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  variantType?: 'boxed' | 'unstyled';
}

export type InputTextProps = IInputTextProps & Omit<PseudoBoxProps, 'size'>;

export const InputText: React.ForwardRefExoticComponent<InputTextProps>;
