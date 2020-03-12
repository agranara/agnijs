import { PseudoBoxProps } from '@agnijs/agni-ui';
import { FlexDirectionProps } from 'styled-system';
import { MotionProps } from 'framer-motion';

interface IFileIconProps {
  fileName?: string;
}

type FileIconPropType = IFileIconProps & PseudoBoxProps;

export const FileIcon: React.FC<FileIconPropType>;

/////////////////////////////////////////////////

interface IFileItemProps extends MotionProps {
  fileName?: string;
  fileSize?: string;
  icon?: React.ReactNode;
  iconSize?: string;
  direction?: FlexDirectionProps;
  infoDirection?: FlexDirectionProps;
}

export const FileItem: React.FC<IFileItemProps>;

////////////////////////////////////////////////////

type FileListType = File | any;

interface IFileListProps {
  files?: FileListType[];
  iconSize?: string;
  colXlSize?: number;
  colLgSize?: number;
  colMdSize?: number;
  colSmSize?: number;
  totalColumn?: number;
  getFileKey?: (item: FileListType, index: number) => string;
  getFileName?: (item: FileListType, index: number) => string;
  getFileSize?: (item: FileListType, index: number) => number;
  onClick?: (item: FileListType, index: number, event: React.MouseEvent<HTMLDivElement>) => void;
  children?: (item: FileListType, index: number) => JSX.Element;
}

export const FileList: React.FC<IFileListProps>;
