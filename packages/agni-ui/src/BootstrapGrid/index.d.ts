import { BoxProps } from '../Box';

interface IRowProps {
  totalColumn?: number;
  isDeck?: boolean;
}

interface IColumnProps extends IRowProps {
  md?: number;
  lg?: number;
  xl?: number;
  col?: number;
  style?: React.StyleHTMLAttributes<HTMLElement>;
  className?: string;
}

type RowProps = IRowProps & BoxProps;

export const Row: React.FC<RowProps>;
export const Column: React.FC<IColumnProps>;
