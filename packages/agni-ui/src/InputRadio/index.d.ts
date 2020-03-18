import { BoxProps } from '../Box';
import { VariantColor } from '../theme';

type ControlSizeType = 'sm' | 'md' | 'lg';

interface IInputRadioProps {
  /**
   * WA-ARIA label
   */
  'aria-label'?: string;
  /**
   * WA-ARIA labelled by
   */
  'aria-labelledby'?: string;
  /**
   * Variant type. Default: 'primary'
   */
  variantColor?: VariantColor;
  /**
   * Size of radio. Default: 'md'
   */
  size?: ControlSizeType;
  /**
   * Default value for checked, used as initial value
   */
  defaultIsChecked?: boolean;
  /**
   * checked state value
   */
  isChecked?: boolean;
  /**
   * Full width usage for radio
   */
  isFullWidth?: boolean;
  /**
   * Is radio disabled?
   */
  isDisabled?: boolean;
  /**
   * Is radio invalid? Will draw different style border
   */
  isInvalid?: boolean;
  /**
   * Input name
   */
  name?: string;
  /**
   * Value used for radio. Means: when triggering check in radio will be
   * `${name}=${value}'
   */
  value?: string;
  /**
   * Additional classname for input chekcbox container
   */
  className?: string;
  /**
   * on input change handler
   */
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  /**
   * on input focus handler
   */
  onFocus?: React.FocusEventHandler<HTMLInputElement>;
  /**
   * on input blur handler
   */
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
}

interface IInputRadioGroupProps {
  /**
   * On change handler for all input radio inside this radio group
   */
  onChange?: (newValues: any[]) => void;
  /**
   * shared name for all input radio inside this radio group
   */
  name?: string;
  /**
   * Variant color for all input radio inside this radio group
   */
  variantColor?: VariantColor;
  /**
   * Checkbox size for all input radio inside this radio group. Default: 'md'
   */
  size?: ControlSizeType;
  /**
   * Default value for radio group, these values should be a partition from
   * value inside input radio
   */
  defaultValue?: any[];
  /**
   * Is radio group shown inline or not
   */
  isInline?: boolean;
  /**
   * Value state for radio group, these values should be a partition from
   * value inside input radio
   */
  value?: any[];
  /**
   * margin spacing horizontal (if isInline true) or vertical between each input radio
   */
  spacing?: string;
  /**
   * Additional classname for radio group
   */
  className?: string;
}

type InputRadioProps = IInputRadioProps & Omit<BoxProps, 'size'>;

type InputRadioGroupProps = IInputRadioGroupProps & Omit<BoxProps, 'size'>;

export const InputRadio: React.ForwardRefExoticComponent<InputRadioProps>;

export const InputRadioGroup: React.ForwardRefExoticComponent<InputRadioGroupProps>;
