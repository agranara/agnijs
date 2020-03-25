import { PseudoBoxProps } from '../PseudoBox';
import { PopupProps } from '../Popup';
import { ButtonProps } from '../Button';
import { LargeSizes } from './../theme';

export interface IDrawerProps {
  /**
   * Drawer size variant.
   */
  size?: keyof LargeSizes;
  /**
   * Drawer max width in pixel
   */
  maxSizePixel?: number;
  /**
   * On animation started (appearing or exiting)
   */
  onAnimationStart?: () => void;
  /**
   * Close on outside click. When backdrop is disabled
   * drawer will put click listener on document to determine
   * is "click" is outside drawer itself
   */
  closeOnOutsideClick?: boolean;
}

export type DrawerProps = IDrawerProps & PopupProps;

/**
 * Drawer component
 *
 * Combine this component with `DrawerHeader`, `DrawerBody`,
 * `DrawerFooter`, and `DrawerClose`
 * or craft on your own
 */
export const Drawer: React.ForwardRefExoticComponent<DrawerProps>;

export const DrawerHeader: React.FC<PseudoBoxProps>;
export const DrawerBody: React.FC<PseudoBoxProps>;
export const DrawerFooter: React.FC<PseudoBoxProps>;
export const DrawerClose: React.FC<ButtonProps>;
