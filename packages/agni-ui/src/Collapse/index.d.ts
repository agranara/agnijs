import { EasingFunction } from 'framer-motion';

type Easing =
  | [number, number, number, number]
  | 'linear'
  | 'easeIn'
  | 'easeOut'
  | 'easeInOut'
  | 'circIn'
  | 'circOut'
  | 'circInOut'
  | 'backIn'
  | 'backOut'
  | 'backInOut'
  | 'anticipate'
  | EasingFunction;

interface ICollapseProps {
  /**
   * Currently collapsed or not
   */
  isOpen?: boolean;
  /**
   * Handler on animation end
   * for 'framer-motion' properties
   */
  onAnimationEnd?(props: { newHeight: number }): void;
  /**
   * Handler on animation start
   * for 'framer-motion' properties
   */
  onAnimationStart?(props: { newHeight: number }): void;
  /**
   * Animation duration in seconds
   */
  duration?: number;
  /**
   * Easing animation style for transition in framer motion
   */
  easing?: Easing;
}

type CollapseProps = ICollapseProps & React.HTMLAttributes<HTMLDivElement>;

export const Collapse: React.ForwardRefExoticComponent<CollapseProps>;
