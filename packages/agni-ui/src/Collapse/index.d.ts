import { BoxProps } from '../Box';

interface ICollapseProps {
  /**
   * Currently collapsed or not
   */
  isOpen?: boolean;
  /**
   * Should animate opacity
   */
  animateOpacity?: boolean;
  /**
   * Handler on animation end
   * for 'react-animate-height' properties
   */
  onAnimationEnd?(props: { newHeight: number }): void;
  /**
   * Handler on animation start
   * for 'react-animate-height' properties
   */
  onAnimationStart?(props: { newHeight: number }): void;
  /**
   * Animation duration
   */
  duration?: number;
  /**
   * When 'isOpen' resulting false, this height will be used
   */
  startingHeight?: number | string;
  /**
   * When 'isOpen' resulting true, this height will be used
   */
  endingHeight?: number | string;
  /**
   * Easing animation style
   */
  easing?: 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out' | 'linear';
}

type CollapseProps = ICollapseProps & BoxProps;

declare const Collapse: React.ForwardRefExoticComponent<CollapseProps>;

export default Collapse;
