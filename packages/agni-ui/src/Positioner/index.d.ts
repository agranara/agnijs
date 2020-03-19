import { MotionProps } from 'framer-motion';
import { PseudoBoxProps } from '../PseudoBox';

type PositionerPlacementType =
  | 'auto'
  | 'auto-start'
  | 'auto-end'
  | 'top'
  | 'top-start'
  | 'top-end'
  | 'bottom'
  | 'bottom-start'
  | 'bottom-end'
  | 'right'
  | 'right-start'
  | 'right-end'
  | 'left'
  | 'left-start'
  | 'left-end';

interface IPositionerProps {
  /**
   * Inner container reference
   */
  innerRef: React.Ref<any>;
  /**
   * Trigger reference
   */
  triggerRef: React.Ref<any>;
  /**
   * Portal where it should bind. Default: document.body
   */
  container?: React.ReactInstance | (() => React.ReactInstance | null) | null;
  /**
   * Position placement, for popper/core to consume
   */
  placement?: PositionerPlacementType;
  /**
   * Is inner container open? Default: false
   */
  isOpen?: boolean;
  /**
   * Gap between trigger and inner container in pixel. Default: 4px
   */
  gap?: number;
  /**
   * Animation duration between entering and exiting in second. Default: 0.15
   */
  duration?: number;
  /**
   * Handler on animation complete
   */
  onAnimationComplete?: () => void;
  /**
   * Is positioner should show arrow pointer. Default: false
   */
  hasArrow?: boolean;
  /**
   * Arrow background color if 'hasArrow' true.
   */
  arrowBackground?: string;
}

export type PositionerProps = IPositionerProps &
  Pick<MotionProps, 'animate' | 'initial' | 'exit'> &
  PseudoBoxProps;

export const Positioner: React.FC<PositionerProps>;

//////////////////////////////////////////////////

type ToggleEventNames = keyof HTMLElementEventMap;

type UseTogglePositionerProp = {
  /**
   * Toggler reference. To listen click away listener
   */
  refs: React.Ref<any>[];
  /**
   * Custom determiner if target is outside or not
   * returns true if outside
   */
  getIsOutside?: (target: HTMLElement) => boolean;
  /**
   * Initial state for state. Default: false
   */
  initialOpen?: boolean;
  /**
   * On internal state isOpen change from 'false' to 'true' handler
   */
  onOpen?: () => void;
  /**
   * On internal state isOpen change from 'true' to 'false' handler
   */
  onClose?: () => void;
  /**
   * Outside click check event to bind. Default: ['mousedown', 'touchstart']
   */
  events?: ToggleEventNames[];
};

type UseTogglePositionerRes = [boolean, (newIsOpen: boolean) => void];

export function useTogglePositioner(prop: UseTogglePositionerProp): UseTogglePositionerRes;
