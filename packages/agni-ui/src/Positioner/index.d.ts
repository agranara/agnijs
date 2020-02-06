import { MotionProps } from 'framer-motion';
import { BoxProps } from '../Box';

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
  placement?: PositionerPlacementType;
  isOpen?: boolean;
  gap?: number;
  duration?: number;
}

type PositionerProps = IPositionerProps &
  Pick<MotionProps, 'animate' | 'initial' | 'exit'> &
  BoxProps;

export const Positioner: React.FC<PositionerProps>;

//////////////////////////////////////////////////

type ToggleEventNames = keyof HTMLElementEventMap;

type UseTogglePositionerProp = {
  refs: React.Ref<any>[];
  initialOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  events: ToggleEventNames[];
};

type UseTogglePositionerRes = [boolean, (newIsOpen: boolean) => void];

export function useTogglePositioner(prop: UseTogglePositionerProp): UseTogglePositionerRes;
