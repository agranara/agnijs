import { BoxProps } from '../Box';
import { IPseudoBoxProps } from '../PseudoBox';
import { VariantColor } from './../theme';

export type ButtonVariantType = 'solid' | 'ghost' | 'link' | 'outline' | 'unstyled';

export type ButtonSizeType = 'lg' | 'md' | 'sm' | 'xs';

export interface IButtonProps {
  /**
   * Should toggle disable button behaviour
   */
  isDisabled?: boolean;
  /**
   * Should show spinner inside button
   */
  isLoading?: boolean;
  /**
   * Should toggle active button behaviour
   */
  isActive?: boolean;
  /**
   * Should make button the same width as its container
   */
  isFullWidth?: boolean;
  /**
   * Variant color for button
   */
  variantColor?: VariantColor;
  /**
   * Predefined styling for button
   */
  variant?: ButtonVariantType;
  /**
   * Button type
   */
  type?: 'button' | 'submit' | 'reset';
  /**
   * Insert icon on left side button
   */
  iconLeft?: React.ReactNode;
  /**
   * Insert icon on right side button
   */
  iconRight?: React.ReactNode;
  /**
   * Loading text
   */
  loadingText?: string;
  /**
   * Icon spacing based on theme.sizes
   */
  iconSpacing?: string | number;
  /**
   * Button size
   */
  size?: ButtonSizeType;
}

type Combined = IPseudoBoxProps & BoxProps;

export type ButtonProps = IButtonProps & Omit<Combined, 'size'>;

export const Button: React.ForwardRefExoticComponent<ButtonProps>;
