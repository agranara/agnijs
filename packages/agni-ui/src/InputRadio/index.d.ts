import { BoxProps } from '../Box';
import { VariantColor, Sizes } from '../theme';

type ControlSizeType = 'sm' | 'md' | 'lg';

interface IInputRadioProps {
  ariaLabel?: string;
  ariaLabelledBy?: string;
  variantColor?: VariantColor;
  defaultIsChecked?: boolean;
  isChecked?: boolean;
  isFullWidth?: boolean;
  size?: ControlSizeType;
}

interface IInputRadioGroupProps {
  variantColor?: VariantColor;
  size?: ControlSizeType;
  isInline?: boolean;
  spacing?: keyof Sizes;
}

type InputRadioProps = IInputRadioProps & Omit<BoxProps, 'size'>;

type InputRadioGroupProps = IInputRadioGroupProps & Omit<BoxProps, 'size'>;

export const InputRadio: React.ForwardRefExoticComponent<InputRadioProps>;

export const InputRadioGroup: React.ForwardRefExoticComponent<InputRadioGroupProps>;
