import * as StyledSystem from 'styled-system';
import { BoxProps } from '../Box';

interface IFlexProps {
  /**
   * Shorthand for Styled-System `alignItems` prop
   */
  align?: BoxProps['alignItems'];
  /**
   * Shorthand for Styled-System `justifyContent` prop
   */
  justify?: BoxProps['justifyContent'];
  /**
   * Shorthand for Styled-System `flexWrap` prop
   */
  wrap?: BoxProps['flexWrap'];
  /**
   * Shorthand for Styled-System `flexDirection` prop
   */
  direction?: BoxProps['flexDirection'];
}

export type FlexProps = IFlexProps & BoxProps;

export const Flex: React.ForwardRefExoticComponent<FlexProps>;
