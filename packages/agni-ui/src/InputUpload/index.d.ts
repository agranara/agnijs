type UploadFileType = {
  _uid: string;
  file: File;
};

interface IDroppedFile {
  acceptedFiles: UploadFileType[];
  rejectedFiles: UploadFileType[];
}

interface IDroppedFilePreview extends IDroppedFile {
  dataUrl?: string;
}

interface IInputUploadBase {
  className?: string;
  accept?: string;
  disabled?: boolean;
  readOnly?: boolean;
  height?: number;
  minSize?: number;
  maxSize?: number;
  onDragEnter?: (event: React.DragEvent<HTMLDivElement>) => void;
  onDragOver?: (event: React.DragEvent<HTMLDivElement>) => void;
  onDragLeave?: (event: React.DragEvent<HTMLDivElement>) => void;
  onDialogCancel?: () => void;
  isDocumentDroppable?: boolean;
  isBubblingDisabled?: boolean;
}

type UploadedFileType = UploadFileType & {
  name?: string;
  size?: string;
  type?: string;
};

interface IInputUploadSingle extends IInputUploadBase {
  initialFile?: UploadedFileType;
  initialFileUrl?: string;
  showImagePreview?: boolean;
  maxViewWidth?: number;
  onDrop?: (prop: IDroppedFile, event: React.DragEvent<HTMLDivElement>) => void;
  onChange?: (prop: IDroppedFilePreview, event: React.DragEvent<HTMLDivElement>) => void;
}

export const InputUploadSingle: React.ForwardRefExoticComponent<IInputUploadSingle>;

/////////////////////////////////////////////////////

interface IInputUploadMulti extends IInputUploadBase {
  initialFile?: UploadedFileType[];
  keepInsertedFile?: boolean;
  listColSize?: {
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  };
  onDrop?: (prop: IDroppedFile, event: React.DragEvent<HTMLDivElement>) => void;
  onChange?: (prop: IDroppedFilePreview, event?: React.DragEvent<HTMLDivElement>) => void;
  onClearItem?: (item: UploadedFileType, index: number) => void;
  onClickItem?: (
    item: UploadedFileType,
    index: number,
    event: React.MouseEvent<HTMLDivElement>
  ) => void;
}

export const InputUploadMulti: React.ForwardRefExoticComponent<IInputUploadMulti>;
