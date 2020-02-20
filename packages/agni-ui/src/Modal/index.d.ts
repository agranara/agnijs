import { LargeSizes } from './../theme';
import { PseudoBoxProps } from '../PseudoBox';
import { PopupProps } from '../Popup';
import { ButtonProps } from '../Button';

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
  size?: LargeSizes;
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
