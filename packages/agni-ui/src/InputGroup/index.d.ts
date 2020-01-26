import { BoxProps } from '../Box';

interface IInputGroupProps {
  size?: 'xs' | 'sm' | 'md' | 'lg';
}

type InputGroupProps = IInputGroupProps & BoxProps;

export const InputGroup: React.ForwardRefExoticComponent<InputGroupProps>;
