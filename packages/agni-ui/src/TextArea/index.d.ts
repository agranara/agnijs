import { PseudoBoxProps } from '../PseudoBox';

interface ITextAreaProps {
  isFocus?: boolean;
  isFullWidth?: boolean;
  minRows?: number;
  maxRows?: number;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  variantType?: 'boxed' | 'unstyled';
}

export type TextAreaProps = ITextAreaProps & Omit<PseudoBoxProps, 'size'>;

export const TextArea: React.ForwardRefExoticComponent<TextAreaProps>;
