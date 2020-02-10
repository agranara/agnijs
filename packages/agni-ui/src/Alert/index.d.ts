// import { BoxProps } from '../Box';

interface IAlertProps {
  variant?: 'primary' | 'info' | 'success' | 'warning' | 'danger';
  title?: JSX.Element;
  description?: JSX.Element;
  icon?: React.ElementType<any>;
  closeable?: boolean;
  isOpen?: boolean;
  afterOpen?: (isOpen: boolean) => void;
  afterClose?: (isOpen: boolean) => void;
  iconSize?: string;
}

// type AlertProps = IAlertProps & BoxProps;

export const Alert: React.FC<IAlertProps>;
