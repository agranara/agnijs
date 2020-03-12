/** @jsx jsx */
import { jsx } from '@emotion/core';
import cn from 'classnames';
import { motion } from 'framer-motion';
import { useUiTheme } from '../../UiProvider';
import { PseudoBox } from '../../PseudoBox';
import { Text } from '../../Text';
import { fileSizeConvert } from '../util';
import { FileIcon } from './FileIcon';

const checkRow = direction => direction === 'row' || direction === 'row-reverse';

const FileItem = ({
  fileName,
  fileSize,
  icon,
  iconSize = 'lg',
  className,
  direction = 'row',
  infoDirection = 'column',
  children,
  initial,
  exit,
  animate,
  ...restProps
}) => {
  const theme = useUiTheme();

  // const isContainerRow = checkRow(direction);
  const isInfoRow = checkRow(infoDirection);

  return (
    <motion.div
      className={cn(['file__item', className])}
      positionTransition={{
        duration: 0.2,
        bounceStiffness: 0
      }}
      tabIndex={-1}
      role="presentation"
      initial={initial}
      animate={animate}
      exit={exit}
      css={{
        display: 'flex',
        flexDirection: direction,
        overflow: 'hidden',
        overflowWrap: 'break-word',
        alignItems: 'center',
        justifyContent: 'center',
        padding: theme.sizes[1],
        userSelect: 'none',
        '&:hover': {
          backgroundColor: theme.colors.gray[100]
        }
      }}
      {...restProps}
    >
      {icon || (
        <PseudoBox className="file__item-left" px={1} py={1}>
          <FileIcon fileName={fileName} fontSize={iconSize} />
        </PseudoBox>
      )}
      <PseudoBox
        className="file__item-info"
        px={1}
        d="flex"
        flexDir={infoDirection}
        {...(isInfoRow && {
          alignItems: 'center'
        })}
      >
        <Text wordBreak="break-word" textOverflow="ellipsis" fontWeight="medium">
          {fileName}
        </Text>
        {isInfoRow && <Text mx={1}>-</Text>}
        <Text color="gray.600">{fileSizeConvert(fileSize)}</Text>
        {children}
      </PseudoBox>
    </motion.div>
  );
};

FileItem.displayName = 'FileItem';

export { FileItem };
