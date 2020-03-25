import { PseudoBoxProps } from '../PseudoBox';
import { PopupProps } from '../Popup';
import { ButtonProps } from '../Button';
import { LargeSizes } from './../theme';

export interface IModalProps {
  /**
   * Modal size variant.
   */
  size?: keyof LargeSizes;
  /**
   * Modal max width in pixel
   */
  maxWidth?: number;
  /**
   * On animation started (appearing or exiting)
   */
  onAnimationStart?: () => void;
}

export type ModalProps = IModalProps & PopupProps;

/**
 * Modal component
 *
 * Combine this component with `ModalHeader`, `ModalBody`,
 * `ModalFooter`, and `ModalClose`
 * or craft on your own
 */
export const Modal: React.ForwardRefExoticComponent<ModalProps>;

export const ModalHeader: React.FC<PseudoBoxProps>;
export const ModalBody: React.FC<PseudoBoxProps>;
export const ModalFooter: React.FC<PseudoBoxProps>;
export const ModalClose: React.FC<ButtonProps>;

//////////////////////////

type ConfirmProps = {
  /**
   * Confirmation title
   */
  title?: string;
  /**
   * Custom icon for confirmation. Default: FiAlertCircle
   */
  icon?: React.ReactNode;
  /**
   * Content of confirmation
   */
  content?: string;
  /**
   * On okay button clicked
   */
  onOkay?: () => Promise<void>;
  /**
   * Button okay text. Default: 'Yes'
   */
  okayText?: string;
  /**
   * Button okay props, same as `Button` props
   */
  okayProps?: ButtonProps;
  /**
   * On cancel button clicked
   */
  onCancel?: () => Promise<void>;
  /**
   * Button cancel text. Default: 'No'
   */
  cancelText?: string;
  /**
   * Button cancel properties
   */
  cancelProps?: ButtonProps;
};

// Modal confirmation shorthand
export function confirm(props: ConfirmProps): () => void;
