import { PseudoBoxProps } from '../PseudoBox';

interface IInputTextProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /**
   * Is input text focused. Default: false
   */
  isFocus?: boolean;
  /**
   * Is input text full width. Default: false
   */
  isFullWidth?: boolean;
  /**
   * Input text size
   */
  size?: 'sm' | 'md' | 'lg';
  /**
   * Variant input text box
   */
  variantType?: 'boxed' | 'unstyled';
}

export type InputTextProps = IInputTextProps & Omit<PseudoBoxProps, 'size'>;

export const InputText: React.ForwardRefExoticComponent<InputTextProps>;
