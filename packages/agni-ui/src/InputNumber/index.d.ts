import { BoxProps } from '../Box';

interface IInputNumberProps {
  focusInputOnChange?: boolean;
  clampValueOnBlur?: boolean;
  keepWithinRange?: boolean;
  min?: number;
  max?: number;
  step?: number;
  precision?: number;
  getAriaValueText?: (value: string) => string;
  isReadOnly?: boolean;
  isInvalid?: boolean;
  isDisabled?: boolean;
  isFullWidth?: boolean;
  size?: 'xs' | 'sm' | 'md' | 'lg';
}

type InputNumberProps = IInputNumberProps & Omit<BoxProps, 'size'>;

declare const InputNumber: React.ForwardRefExoticComponent<InputNumberProps>;

export default InputNumber;
