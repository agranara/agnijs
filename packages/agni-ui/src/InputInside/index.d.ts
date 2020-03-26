import { BoxProps } from '../Box';
import { IInputTextProps } from '../InputText';

interface IInputInsideProps {
  /**
   * Disable pointer events for label inside. Default: false
   */
  disablePointerEvents?: boolean;
  /**
   * Size of box matched with input field. Default: 'md'
   */
  size?: IInputTextProps['size'];
  /**
   * Input inside placement. Default: 'left'
   */
  placement?: 'left' | 'right';
}

type InputInsideProps = IInputInsideProps & BoxProps;

export const InputInside: React.FC<InputInsideProps>;
