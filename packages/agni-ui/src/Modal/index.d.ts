import { PseudoBoxProps } from '../PseudoBox';
import { PopupProps } from '../Popup';
import { ButtonProps } from '../Button';
import { LargeSizes } from './../theme';

export interface IModalProps {
  /**
   * Indicates if popup is shown when `true`
   */
  isOpen: PopupProps['isOpen'];
  /**
   * If backdrop should be hidden
   */
  isBackdropHidden?: PopupProps['isBackdropHidden'];
  /**
   * Callback on close function from inside popup component
   * It triggered when `closeOnBackdropClick` value is `true`
   * or `closeOnEscape` value is `true`.
   */
  onClose?: PopupProps['onClose'];
  /**
   * Callback on click backdrop component.
   * Only occur when `isBackdropHidden` value is `true`
   */
  onBackdropClick?: PopupProps['onBackdropClick'];
  /**
   * Callback function when `ESCAPE` key pressed.
   */
  onEscapeKeyDown?: PopupProps['onEscapeKeyDown'];
  /**
   * If `true`, clicking the backdrop will fire `onClose` callback.
   */
  closeOnBackdropClick?: PopupProps['closeOnBackdropClick'];
  /**
   * If `true`, pressing `ESCAPE` key will fire `onClose` callback.
   */
  closeOnEscape?: PopupProps['closeOnEscape'];
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
  /**
   * On popup exited completely
   */
  onAnimationCompleted?: PopupProps['onAnimationCompleted'];
}

export type ModalProps = IModalProps & Omit<PseudoBoxProps, 'size'>;

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
