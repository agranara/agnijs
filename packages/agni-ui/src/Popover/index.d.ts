import { PositionerProps } from '../Positioner';
import { PseudoBoxProps } from '../PseudoBox';

interface IPopoverProps {
  /**
   * Title popover if any
   */
  title?: React.ReactNode;
  /**
   * Title props
   */
  titleProps?: Omit<PseudoBoxProps, 'onMouseEnter' | 'onMouseLeave'>;
  /**
   * Content of popover
   */
  content?: React.ReactNode;
  /**
   * Content props
   */
  contentProps?: PseudoBoxProps;
  /**
   * Content props
   */
  containerProps?: PseudoBoxProps;
  /**
   * Is popover shown as tooltip. Will render tooltip styling
   * and on hover event bind
   */
  isTooltip?: boolean;
  /**
   * Delay open for tooltip in ms. Default: 300
   */
  delayOpen?: number;
  /**
   * Delay close for tooltip in ms. Default: 50
   */
  delayClose?: number;
}

type PopoverProps = IPopoverProps & Omit<PositionerProps, 'innerRef' | 'triggerRef'>;

export const Popover: React.FC<PopoverProps>;
