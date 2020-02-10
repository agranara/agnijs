type ToastOptionsType = {
  title?: React.ReactNode;
  icon?: React.ReactNode;
  /** Duration in second */
  duration?: number;
  placement?:
    | 'top-left'
    | 'top-center'
    | 'top-right'
    | 'bottom-left'
    | 'bottom-center'
    | 'bottom-right';
  variant?: 'primary' | 'info' | 'success' | 'warning' | 'danger' | 'loading';
  onClick?: React.MouseEventHandler;
  onClose?: React.MouseEventHandler;
  closeable?: boolean;
  children?: any;
  containerId?: string;
};

type ToastFunctionReturnType = Promise<void> & { hide?: () => void };

type ToastFunctionType = (
  description: string,
  options?: ToastOptionsType
) => ToastFunctionReturnType;

export type ToastType = ToastFunctionType & {
  primary: ToastFunctionType;
  info: ToastFunctionType;
  success: ToastFunctionType;
  warning: ToastFunctionType;
  danger: ToastFunctionType;
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
