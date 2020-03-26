import { BoxProps } from '../Box';

interface IInputLabelProps {
  /**
   * Is input label displayed inline?
   */
  isRow?: boolean;
  /**
   * Is input label required?
   */
  isRequired?: boolean;
}

type InputLabelProps = IInputLabelProps & BoxProps;

export const InputLabel: React.ForwardRefExoticComponent<InputLabelProps>;

export const RequiredIndicator: React.FC<BoxProps>;
