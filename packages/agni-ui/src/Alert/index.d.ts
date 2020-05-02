import { PseudoBoxProps } from '../PseudoBox';

interface IAlertProps {
  afterOpen?: (isOpen: boolean) => void;
  afterClose?: (isOpen: boolean) => void;
  closeable?: boolean;
  description?: JSX.Element;
  descriptionProps?: PseudoBoxProps;
  icon?: React.ElementType<any>;
  iconProps?: PseudoBoxProps;
  iconSize?: string;
  isOpen?: boolean;
  title?: JSX.Element;
  titleProps?: PseudoBoxProps;
  variant?: 'primary' | 'info' | 'success' | 'warning' | 'danger';
}

// type AlertProps = IAlertProps & BoxProps;

export const Alert: React.FC<IAlertProps>;
