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
  innerRef: React.Ref<any>;
  triggerRef: React.Ref<any>;
  container?: React.ReactInstance | (() => React.ReactInstance | null) | null;
  placement?: PositionerPlacementType;
  isOpen?: boolean;
  gap?: number;
  duration?: number;
  onAnimationComplete?: () => void;
}

type PositionerProps = IPositionerProps &
  Pick<MotionProps, 'animate' | 'initial' | 'exit'> &
  PseudoBoxProps;

export const Positioner: React.FC<PositionerProps>;

//////////////////////////////////////////////////

type ToggleEventNames = keyof HTMLElementEventMap;

type UseTogglePositionerProp = {
  refs: React.Ref<any>[];
  getIsOutside?: (target: HTMLElement) => boolean;
  initialOpen?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
  events?: ToggleEventNames[];
};

type UseTogglePositionerRes = [boolean, (newIsOpen: boolean) => void];

export function useTogglePositioner(prop: UseTogglePositionerProp): UseTogglePositionerRes;
