import { PseudoBoxProps } from '../PseudoBox';
import { PortalProps } from '../Portal';

export class PopupManager {
  constructor();
  add(popup: any, container: any): number;
  remove(popup: any): void;
  isTopPopup(popup: any): boolean;
}

interface IPopupProps {
  /**
   * Indicates if popup is shown when `true`
   */
  isOpen: boolean;
  /**
   * A node, component instance, or function that returns either.
   * The `container` will have the portal children appended to it.
   * By default, it uses the body of the top-level document object,
   * so it's simply `document.body` most of the time.
   */
  container?: PortalProps['container'];
  /**
   * Popup manager override
   */
  manager?: PopupManager;
  /**
   * Callback on close function from inside popup component
   * It triggered when `closeOnBackdropClick` value is `true`
   * or `closeOnEscape` value is `true`.
   */
  onClose?: {
    bivarianceHack(event: {}, reason: 'backdropClick' | 'escapeKeyDown'): void;
  }['bivarianceHack'];
  /**
   * Callback on click backdrop component.
   * Only occur when `isBackdropHidden` value is `true`
   */
  onBackdropClick?: React.ReactEventHandler<{}>;
  /**
   * Callback function when `ESCAPE` key pressed.
   */
  onEscapeKeyDown?: React.ReactEventHandler<{}>;
  /**
   * Callback fired once the children has been mounted into the `container`
   */
  onRendered?: PortalProps['onRendered'];
  /**
   * If `true`, the popup will automatically shift focus to itself when it opens, and
   * replace it to the last focused element when it closes.
   * This also works correctly with any popup children that have the `disableAutoFocus` prop.
   */
  isAutoFocus?: boolean;
  /**
   * If `true`, the modal will prevent focus from leaving the modal while open
   */
  isEnforceFocus?: boolean;
  /**
   * If `true`, the modal will restore focus to previously focused element once
   */
  isRestoreFocus?: boolean;
  /**
   * If scroll lock behavior should be enabled
   */
  isScrollLockDisabled?: boolean;
  /**
   * If backdrop should be hidden
   */
  isBackdropHidden?: boolean;
  /**
   * Portal usage. `false` if the children stay within it's parent DOM hierarchy
   */
  usePortal?: boolean;
  /**
   * If `true`, clicking the backdrop will fire `onClose` callback.
   */
  closeOnBackdropClick?: boolean;
  /**
   * If `true`, pressing `ESCAPE` key will fire `onClose` callback.
   */
  closeOnEscape?: boolean;
}

type PopupProps = IPopupProps & PseudoBoxProps;

/**
 * Popup currently used internally to make other components
 */
export const Popup: React.ForwardRefExoticComponent<PopupProps>;
