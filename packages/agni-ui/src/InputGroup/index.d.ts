import { BoxProps } from '../Box';
import { IInputTextProps } from '../InputText';

interface IInputGroupProps {
  size?: IInputTextProps['size'];
}

type InputGroupProps = IInputGroupProps & BoxProps;

export const InputGroup: React.ForwardRefExoticComponent<InputGroupProps>;
