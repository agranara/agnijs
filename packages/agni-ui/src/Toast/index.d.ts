import { PseudoBoxProps } from '../PseudoBox';

type ToastOptionsType = {
  /**
   * Toast header if present
   */
  title?: React.ReactNode;
  /**
   * Title props
   */
  titleProps?: PseudoBoxProps;
  /**
   * Custom icon
   */
  icon?: React.ReactNode;
  /**
   * Icon props
   */
  iconProps?: PseudoBoxProps;
  /**
   * Description props
   */
  descriptionProps?: PseudoBoxProps;
  /**
   * Toast duration in second. Default: 5
   */
  duration?: number;
  /**
   * Toast placement. Default: 'top-center'
   */
  placement?:
    | 'top-left'
    | 'top-center'
    | 'top-right'
    | 'bottom-left'
    | 'bottom-center'
    | 'bottom-right';
  /**
   * Predefined toast color variant
   */
  variant?: 'primary' | 'info' | 'success' | 'warning' | 'danger' | 'loading';
  /**
   * When alert clicked
   */
  onClick?: React.MouseEventHandler;
  /**
   * When close button alert clicked
   */
  onClose?: React.MouseEventHandler;
  /**
   * Is alert closeable. Default: false
   */
  closeable?: boolean;
  /**
   * Custom format for toast.
   * Ignoring title, icon, and description properties
   */
  children?: any;
  /**
   * Custom containerId for toast.
   * Container toast placed on document body when created.
   * Default: 'toast__container'
   */
  containerId?: string;
};

type ToastFunctionReturnType = () => void;

type ToastFunctionType = (
  description: string,
  options?: ToastOptionsType
) => ToastFunctionReturnType;

type ToastVariantType = {
  /** Toast variant primary */
  primary: ToastFunctionType;
  /** Toast variant info */
  info: ToastFunctionType;
  /** Toast variant success */
  success: ToastFunctionType;
  /** Toast variant warning */
  warning: ToastFunctionType;
  /** Toast variant danger */
  danger: ToastFunctionType;
  /** Toast variant loading */
  loading: ToastFunctionType;
};

export type ToastType = ToastFunctionType & ToastVariantType;

export const toast: ToastType;
