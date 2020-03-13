/** @jsx jsx */
import { jsx } from '@emotion/core';
import { useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useUiTheme } from '../../UiProvider';
import { Box } from '../../Box';
import { FileItem } from './FileItem';

const defaultKeyGetter = (_, i) => i;
const defaultNameGetter = item => item.name;
const defaultSizeGetter = item => item.size;

const FileList = ({
  files,
  iconSize = 'lg',
  colXlSize = 1,
  colLgSize = 1,
  colMdSize = 1,
  colSmSize = 1,
  getFileKey = defaultKeyGetter,
  getFileName = defaultNameGetter,
  getFileSize = defaultSizeGetter,
  onClick,
  children
}) => {
  const theme = useUiTheme();

  const handleClick = useCallback(
    (item, index) => {
      return ev => {
        ev.persist();
        if (onClick) {
          onClick(item, index, ev);
        }
      };
    },
    [onClick]
  );

  if (!Array.isArray(files)) return null;

  const getResponsiveCss = (size, unit) => {
    const w = (1 / unit) * 100;

    return {
      [`@media (min-width: ${theme.sizes[size]})`]: {
        maxWidth: `${w}%`
      }
    };
  };

  const mappedFiles = [];
  for (let i = 0; i < files.length; i++) {
    const item = files[i];
    mappedFiles.push(
      <FileItem
        key={getFileKey(item, i)}
        fileName={getFileName(item)}
        fileSize={getFileSize(item)}
        onClick={handleClick(item, i)}
        iconSize={iconSize}
        direction="row"
        infoDirection="column"
        css={{
          width: '100%',
          flexGrow: 0,
          justifyContent: 'start',
          alignItems: 'start',
          ...(colSmSize && getResponsiveCss('sm', colSmSize)),
          ...(colMdSize && getResponsiveCss('md', colMdSize)),
          ...(colLgSize && getResponsiveCss('lg', colLgSize)),
          ...(colXlSize && getResponsiveCss('xl', colXlSize))
        }}
        initial={{
          opacity: 0,
          y: -10
        }}
        animate={{
          opacity: 1,
          y: 0
        }}
        exit={{
          opacity: 0,
          y: -10
        }}
      >
        {typeof children === 'function' && children(item, i)}
      </FileItem>
    );
  }

  return (
    <Box d="flex" flexDir="row" alignItems="start" flexWrap="wrap">
      <AnimatePresence initial={false}>{mappedFiles}</AnimatePresence>
    </Box>
  );
};

FileList.displayName = 'FileList';

export { FileList };
