import { BoxProps } from '../Box';

interface IRowProps {
  size?: number;
  isDeck?: boolean;
}

interface IColumnProps {
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
