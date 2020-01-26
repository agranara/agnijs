import { BoxProps } from '../Box';

interface IContainerProps {
  isFluid?: boolean;
}

export type ContainerProps = IContainerProps & BoxProps;

export const Container: React.FC<ContainerProps>;
