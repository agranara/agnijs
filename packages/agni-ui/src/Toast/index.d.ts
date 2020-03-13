type ToastOptionsType = {
  /**
   * Toast header if present
   */
  title?: React.ReactNode;
  /**
   * Custom icon
   */
  icon?: React.ReactNode;
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

type ToastFunctionReturnType = Promise<void> & { hide?: () => void };

type ToastFunctionType = (
  description: string,
  options?: ToastOptionsType
) => ToastFunctionReturnType;

export type ToastType = ToastFunctionType & {
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

declare namespace toast {
  const primary: ToastFunctionType;
  const info: ToastFunctionType;
  const success: ToastFunctionType;
  const warning: ToastFunctionType;
  const danger: ToastFunctionType;
  const loading: ToastFunctionType;
}

export { toast };
