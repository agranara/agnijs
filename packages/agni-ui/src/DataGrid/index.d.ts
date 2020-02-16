type RowDatumStyleType = {
  /** Row index */
  index: number;
  /** Row record */
  record: any;
};

type RenderCellValueProp = {
  /** Row Record */
  record: any;
  /** Row index */
  indexRow: number;
  /** Cell index */
  indexCell: number;
};

type DataGridColumnType = {
  /** Key column data to render. Required */
  key: string;
  /** Label in table header. */
  label?: string;
  /** Sub-column group in header */
  children?: DataGridColumnType[];
  /** Freeze left. When freeze left is enabled, make sure it puts on higher order of columns */
  freezeLeft?: boolean;
  /** Custom render value function */
  renderCellValue?: (prop: RenderCellValueProp) => JSX.Element | React.ReactNode;
  /** Cell Style Object */
  cellStyle?: React.CSSProperties;
  /** Custom style based on row record */
  renderCellStyle?: (prop: RenderCellValueProp) => React.CSSProperties;
  /** Empty data placeholder */
  emptyData?: React.ReactNode;
};

type DataGridProps = {
  /** Data source in array. Required */
  data: any[];
  /** Columns for datagrid. Required */
  columns: DataGridColumnType[];
  /** Row height or each datum height in number. Default: 36 */
  rowHeight?: number;
  /** Data grid container height. Default: 350 */
  height?: number;
  /** Sample start index to make autosize columns during initial render. Default: 0 */
  sampleStart?: number;
  /** Sample end index to make autosize columns during initial render. Default: 2 */
  sampleEnd?: number;
  /** Initial scroll offset top. Default: 0 */
  initialOffsetTop?: number;
  /** Initial scroll offset left. Default: 0 */
  initialOffsetLeft?: number;
  /** Get row style */
  getRowDatumStyle?: (prop: RowDatumStyleType) => React.CSSProperties;
};

export const DataGrid: React.FC<DataGridProps>;
