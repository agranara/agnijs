import { VariantColor } from '../theme';
import { PseudoBoxProps } from '../PseudoBox';

interface ITagProps {
  variantColor?: VariantColor;
  closeable?: boolean;
  isOpen?: boolean;
  afterOpen?: (isOpen: boolean) => void;
  afterClose?: (isOpen: boolean) => void;
}

type TagProps = ITagProps & PseudoBoxProps;

export const Tag: React.FC<TagProps>;
