import { BoxProps } from '../Box';

interface IInputLabelProps {
  isRow?: boolean;
  isRequired?: boolean;
}

type InputLabelProps = IInputLabelProps & BoxProps;

export const InputLabel: React.ForwardRefExoticComponent<InputLabelProps>;

export const RequiredIndicator: React.FC<BoxProps>;
