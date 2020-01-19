import { BoxProps } from '../Box';

interface IContainerProps {
  isFluid?: boolean;
}

export type ContainerProps = IContainerProps & BoxProps;

declare const Container: React.FC<ContainerProps>;

export default Container;
