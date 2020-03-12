import React from 'react';
import cn from 'classnames';
import { PseudoBox } from '../../PseudoBox';

import IconDoc from '../../Icon/file/Doc';
import IconPpt from '../../Icon/file/Ppt';
import IconXls from '../../Icon/file/Xls';
import IconPdf from '../../Icon/file/Pdf';
import IconJpg from '../../Icon/file/Jpg';
import IconMp3 from '../../Icon/file/Mp3';
import IconMp4 from '../../Icon/file/Mp4';
import IconZip from '../../Icon/file/Zip';
import IconFile from '../../Icon/file/Unknown';

const extensionMap = {
  xls: IconXls,
  xlsx: IconXls,
  xlsm: IconXls,
  ppt: IconPpt,
  pptx: IconPpt,
  doc: IconDoc,
  docx: IconDoc,
  csv: IconXls,
  tsv: IconXls,
  pdf: IconPdf,
  jpg: IconJpg,
  jpeg: IconJpg,
  svg: IconJpg,
  gif: IconJpg,
  png: IconJpg,
  tar: IconZip,
  gz: IconZip,
  zip: IconZip,
  '7z': IconZip,
  rar: IconZip,
  mp3: IconMp3,
  wav: IconMp3,
  avi: IconMp4,
  mp4: IconMp4,
  mov: IconMp4,
  mkv: IconMp4
};

const FileIcon = ({ fileName, fontSize = 'lg', className, ...restProps }) => {
  let Icon = IconFile;

  if (fileName) {
    const splitFilename = fileName.split('.');
    if (splitFilename.length > 1) {
      const extension = splitFilename[splitFilename.length - 1];
      if (extensionMap[extension]) {
        Icon = extensionMap[extension];
      }
    }
  }
  return (
    <PseudoBox className={cn(['file__icon', className])} fontSize={fontSize} {...restProps}>
      <Icon />
    </PseudoBox>
  );
};

FileIcon.displayName = 'FileIcon';

export { FileIcon };
