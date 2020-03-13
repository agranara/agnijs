type UploadFileType = {
  /** Internal uid used for react key component */
  _uid: string;
  /** Uploaded file */
  file: File;
};

interface IDroppedFile {
  /** Accepted files match rules with `accept` rules */
  acceptedFiles: UploadFileType[];
  /** Rejected files that doesn't match with `accept` rules */
  rejectedFiles: UploadFileType[];
}

type UploadedFileType = UploadFileType & {
  /** File name information */
  name?: string;
  /** File size information */
  size?: string;
  /** File mime type information */
  type?: string;
  /** File path information */
  path?: string;
};

type ExcludeInputProps =
  | 'onChange'
  | 'type'
  | 'className'
  | 'onDrop'
  | 'defaultValue'
  | 'value'
  | 'readOnly';

interface IInputUploadBase extends Omit<React.HTMLAttributes<HTMLInputElement>, ExcludeInputProps> {
  /** DOM classname */
  className?: string;
  /**
   * A DOMString representing the path to the selected file.
   * This string is comma separated unique file type specifiers
   * Source: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file
   */
  accept?: string;
  /** Disable input type file. Default: false */
  disabled?: boolean;
  /** Height droppable container. */
  height?: number;
  /** Minimum size of accepted files. Default: 0 */
  minSize?: number;
  /** Maxmium size of accepted files. Default: Infinity */
  maxSize?: number;
  /** Handler on dragged file entering dropzone */
  onDragEnter?: (event: React.DragEvent<HTMLDivElement>) => void;
  /** Handler on dragged file moved inside dropzone */
  onDragOver?: (event: React.DragEvent<HTMLDivElement>) => void;
  /** Handler on dragged file leaving dropzone */
  onDragLeave?: (event: React.DragEvent<HTMLDivElement>) => void;
  /** On clicked `cancel` in prompted dialog */
  onDialogCancel?: () => void;
  /** Use document as dropzone. Default: false */
  isDocumentDroppable?: boolean;
  /**
   * Is event bubbling disabled. Default: false.
   * for more explanation, visit https://javascript.info/bubbling-and-capturing
   */
  isBubblingDisabled?: boolean;
  /**
   * Placeholder inside dropzone initially
   */
  placeholder?: string;
  /**
   * Placeholder inside dropzone when file entering dropzone
   */
  dragPlaceholder?: string;
}

interface IInputUploadSingle extends IInputUploadBase {
  /** Initial uploaded file name */
  initialFileName?: string;
  /** Initial uploaded file size */
  initialFileSize?: number;
  /** Initial uploaded file path */
  initialFilePath?: string;
  /** Should show image with preview?. Default: true */
  showImagePreview?: boolean;
  /** Max preview width in pixel. Default: 320 */
  maxViewWidth?: number;
  /** On file dropped inside dropzone handler */
  onDrop?: (droppedProps: IDroppedFile, event: React.DragEvent<HTMLDivElement>) => void;
  /** On file changed during dropped and removed handler  */
  onChange?: (
    changedFile: File,
    event: React.DragEvent<HTMLDivElement>,
    droppedProps: IDroppedFile
  ) => void;
}

/**
 * Input single file upload
 */
export const InputUploadSingle: React.ForwardRefExoticComponent<IInputUploadSingle>;

/////////////////////////////////////////////////////

interface IInputUploadMulti extends IInputUploadBase {
  /**
   * Initial files for already uploaded files
   */
  initialFiles?: any[];
  /**
   * Get unique identifier from initial files. Default: (item, index) => index
   * This used as `key` for react component
   */
  getInitialFileKey?: (item?: any, index?: number) => string;
  /**
   * Get file name from initial files. Default: (item, index) => item.name
   */
  getInitialFileName?: (item?: any, index?: number) => string;
  /**
   * Get file size from initial files. Default: (item, index) => item.size
   */
  getInitialFileSize?: (item?: any, index?: number) => number;
  /**
   * Persist dropped files into internal state. Default: true.
   * When set to false, only latest dropped files will be stored inside state
   */
  keepInsertedFile?: boolean;
  /**
   * Responsive list files total column for small device. Default: 1
   */
  colSmSize?: number;
  /**
   * Responsive list files total column for medium device. Default: 2
   */
  colMdSize?: number;
  /**
   * Responsive list files total column for large device. Default: 3
   */
  colLgSize?: number;
  /**
   * Responsive list files total column for extra large device. Default: 4
   */
  colXlSize?: number;
  /**
   * On dropped files handler
   */
  onDrop?: (droppedProps: IDroppedFile, event: React.DragEvent<HTMLDivElement>) => void;
  /**
   * On changed files handler. Called inside on drop and on clear itel
   */
  onChange?: (changedFiles: File[], event?: React.DragEvent<HTMLDivElement>) => void;
  /**
   * When file removed from uploader triggered.
   * Clear clicked item from uploader internal state
   */
  onClearItem?: (item: UploadedFileType, index: number) => void;
  /**
   * When file inside list clicked
   */
  onClickItem?: (
    item: UploadedFileType,
    index: number,
    event: React.MouseEvent<HTMLDivElement>
  ) => void;
  /**
   * When 'remove' button inside uploaded list triggered
   */
  onClearInitial?: (item: any, index: number) => void;
}

/**
 * Input upload for multiple files
 */
export const InputUploadMulti: React.ForwardRefExoticComponent<IInputUploadMulti>;
