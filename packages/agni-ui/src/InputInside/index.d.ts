import { BoxProps } from '../Box';

interface IInputInsideProps {
  disablePointerEvents?: boolean;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  placement?: 'left' | 'right';
}

type InputInsideProps = IInputInsideProps & BoxProps;

export const InputInside: React.FC<InputInsideProps>;
