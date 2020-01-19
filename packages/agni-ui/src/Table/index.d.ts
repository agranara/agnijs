import { PseudoBoxProps } from '../PseudoBox';

interface ITableRowProps {
  isActive?: boolean;
  isHoverable?: boolean;
  isClickable?: boolean;
}

type TableRowProps = ITableRowProps & PseudoBoxProps;

export const Table: React.ForwardRefExoticComponent<PseudoBoxProps>;
export const THead: React.ForwardRefExoticComponent<PseudoBoxProps>;
export const Th: React.FC<PseudoBoxProps>;
export const ThSortContainer: React.FC<PseudoBoxProps>;
export const ThSortIcon: React.FC<PseudoBoxProps>;
export const TBody: React.FC<PseudoBoxProps>;
export const Tr: React.ForwardRefExoticComponent<TableRowProps>;
export const Td: React.ForwardRefExoticComponent<PseudoBoxProps>;
export const TFoot: React.ForwardRefExoticComponent<PseudoBoxProps>;
