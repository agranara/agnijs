import { BoxProps } from '../Box';
import { IInputTextProps } from '../InputText';

interface IInputNumberProps {
  /**
   * Value inside input number
   */
  value?: null | string | number;
  /**
   * Focus input on change. Default: true
   */
  focusInputOnChange?: boolean;
  /**
   * Set value to max or min on blur. Default: true
   */
  clampValueOnBlur?: boolean;
  /**
   * Keep value within min and max
   * when using arrow stepper up and down. Default: true
   */
  keepWithinRange?: boolean;
  /**
   * Minimum number. Default: -Infinity
   */
  min?: number;
  /**
   * Maximum number. Default: Infinity
   */
  max?: number;
  /**
   * Increment or decrement factor when using
   * keyboard arrow up and down, or arrow stepper up and down
   * Default: 1
   */
  step?: number;
  /**
   * Precision number behind commas. Default: 0
   */
  precision?: number;
  /**
   * Get aria-valuetext for input number
   */
  getAriaValueText?: (value: string) => string;
  /**
   * Is input read only
   */
  isReadOnly?: boolean;
  /**
   * Is input invalid
   */
  isInvalid?: boolean;
  /**
   * Is input disabled
   */
  isDisabled?: boolean;
  /**
   * Is input full width
   */
  isFullWidth?: boolean;
  /**
   * Input size. Default: 'md'
   */
  size?: IInputTextProps['size'];
  /**
   * Thousand separator. Default: ','
   */
  thousandSeparator?: ',' | '.' | '';
  /**
   * Decimal separator. Default: '.'
   */
  decimalSeparator?: ',' | '.';

}

type InputNumberProps = IInputNumberProps & Omit<BoxProps, 'size' | 'defaultValue'>;

export const InputNumber: React.ForwardRefExoticComponent<InputNumberProps>;
