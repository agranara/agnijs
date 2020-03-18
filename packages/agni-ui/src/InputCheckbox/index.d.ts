import { BoxProps } from '../Box';
import { VariantColor } from '../theme';
import { ControlSizeType } from '../InputRadio';

interface IInputCheckboxProps {
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
   * Size of checkbox. Default: 'md'
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
   * Full width usage for checkbox
   */
  isFullWidth?: boolean;
  /**
   * Is checkbox disabled?
   */
  isDisabled?: boolean;
  /**
   * Is checkbox invalid? Will draw different style border
   */
  isInvalid?: boolean;
  /**
   * Show 'minus' icon inside of 'check', useful for "Check All" like checkbox
   */
  isIndeterminate?: boolean;
  /**
   * Input name
   */
  name?: string;
  /**
   * Value used for checkbox. Means: when triggering check in checkbox will be
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

type InputCheckboxProps = IInputCheckboxProps & Omit<BoxProps, 'size'>;

export const InputCheckbox: React.ForwardRefExoticComponent<InputCheckboxProps>;

////////////////////////////////////

interface IInputCheckboxGroupProps {
  /**
   * On change handler for all input checkbox inside this checkbox group
   */
  onChange?: (newValues: any[]) => void;
  /**
   * shared name for all input checkbox inside this checkbox group
   */
  name?: string;
  /**
   * Variant color for all input checkbox inside this checkbox group
   */
  variantColor?: VariantColor;
  /**
   * Checkbox size for all input checkbox inside this checkbox group. Default: 'md'
   */
  size?: ControlSizeType;
  /**
   * Default value for checkbox group, these values should be a partition from
   * value inside input checkbox
   */
  defaultValue?: any[];
  /**
   * Is checkbox group shown inline or not
   */
  isInline?: boolean;
  /**
   * Value state for checkbox group, these values should be a partition from
   * value inside input checkbox
   */
  value?: any[];
  /**
   * margin spacing horizontal (if isInline true) or vertical between each input checkbox
   */
  spacing?: string;
  /**
   * Additional classname for checkbox group
   */
  className?: string;
}

type InputCheckboxGroupProps = IInputCheckboxGroupProps &
  Omit<BoxProps, 'size' | 'onChange' | 'defaultValue' | 'value'>;

export const InputCheckboxGroup: React.FC<InputCheckboxGroupProps>;
