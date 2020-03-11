export type RowDatumStyleType = {
  /** Row index */
  indexRow: number;
  /** Row record */
  record: any;
};

export type RenderCellValueProp = {
  /** Row Record */
  record: any;
  /** Row index */
  indexRow: number;
  /** Cell index */
  indexCell: number;
};

export type RenderWidthProp = {
  /** Column or cell index */
  indexCell: number;
};

type ColumnSortType = 'asc' | 'desc';

export type DataGridRowProps = {
  record?: any;
  indexRow?: number;
  style?: React.CSSProperties;
  role?: string;
  'aria-rowindex'?: number;
  className?: string;
};

export type DataGridCellProps = {
  record?: any;
  indexRow?: number;
  indexCell?: number;
  style?: React.CSSProperties;
  role?: string;
  'aria-colindex'?: string;
  className?: string;
};

export type DataGridColumnType = {
  /**
   * Key column data to render. Required
   */
  key: string;
  /**
   * Label in table header.
   */
  label?: string;
  /**
   * Sub-column group in header
   */
  children?: DataGridColumnType[];
  /**
   * Freeze left. When freeze left is enabled
   * make sure it puts on higher order of columns
   */
  freezeLeft?: boolean;
  /**
   * Set column width for header and cell
   */
  width?: number;
  /**
   * Set column width for header and cell by function
   */
  renderWidth?: (prop: RenderWidthProp) => number;
  /**
   * Custom render value function
   */
  renderCellValue?: (prop: RenderCellValueProp) => JSX.Element | React.ReactNode;
  /**
   * Header column style css properties
   */
  headerCellStyle?: React.CSSProperties;
  /**
   * Cell style css properties
   */
  cellStyle?: React.CSSProperties;
  /**
   * Custom style css properties based on row record
   */
  renderCellStyle?: (prop: RenderCellValueProp) => React.CSSProperties;
  /**
   * Sort key that different with provided key.
   */
  sortKey?: string;
};

type DataGridProps = {
  /**
   * Data source in array. Required
   */
  data: any[];
  /**
   * Columns for datagrid. Required
   */
  columns: DataGridColumnType[];
  /**
   * Get row style based on datum, index cell and index row
   */
  getRowDatumStyle?: (prop: RowDatumStyleType) => React.CSSProperties;
  /**
   * Sort key based on provided columns
   */
  sortKey?: string;
  /**
   * Sort order. For rendering icon up or down inside
   */
  sortOrder?: ColumnSortType;
  /**
   * Handle sort change
   */
  onSortChange?: (sortKey: string, sortOrder: ColumnSortType) => void;
  /**
   * Row height or each datum height in number. Default: 36
   */
  rowHeight?: number;
  /**
   * Data grid container height
   */
  height?: number;
  /**
   * Data grid container height calculated
   * by multiply this value and row height. Default: 10
   */
  heightByItem?: number;
  /**
   * Sample start index to make autosize columns
   * during initial render. Default: 0
   */
  sampleStart?: number;
  /**
   * Sample end index to make autosize columns
   * during initial render. Default: 2
   */
  sampleEnd?: number;
  /**
   * Initial scroll offset top. Default: 0
   */
  initialOffsetTop?: number;
  /**
   * Initial scroll offset left. Default: 0
   */
  initialOffsetLeft?: number;
  /**
   * Empty data placeholder. Default: 'No data found'
   */
  emptyData?: React.ReactNode;
  /**
   * Is headless, no header rendered. Default: false
   */
  isHeadless?: boolean;
  /**
   * Is content loading. Add loading indicator if true. Default: false
   */
  isLoading?: boolean;
  /**
   * Loading data placeholder. Default: spinner with text
   */
  loadingData?: React.ReactNode;
  /**
   * Custom row component. Default: 'div'
   */
  rowComponent?: React.FC<DataGridRowProps>;
  /**
   * Custom cell component. Default: 'div'
   */
  cellComponent?: React.FC<DataGridCellProps>;
};

export const DataGrid: React.NamedExoticComponent<DataGridProps>;
