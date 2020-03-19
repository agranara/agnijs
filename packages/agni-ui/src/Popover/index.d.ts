import { PositionerProps } from '../Positioner';

interface IPopoverProps {
  /**
   * Title popover if any
   */
  title?: React.ReactNode;
  /**
   * Content of popover
   */
  content?: React.ReactNode;
  /**
   * Is popover shown as tooltip. Will render tooltip styling
   * and on hover event bind
   */
  isTooltip?: boolean;
}

type PopoverProps = IPopoverProps & Omit<PositionerProps, 'innerRef' | 'triggerRef'>;

export const Popover: React.FC<PopoverProps>;
