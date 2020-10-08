/** @jsx jsx */
import { jsx } from '@emotion/core';
import { memo } from 'react';
import { motion } from 'framer-motion';
import { FiX } from 'react-icons/fi';
import { PseudoBox } from '../../PseudoBox';
import { useSelectMetaContext } from '../SelectMetaContext';
import { useUiTheme } from '../../UiProvider/hooks/useUiTheme';

const SelectValueItem = memo(({ children, value, hasExit, hideClear }) => {
  const theme = useUiTheme();
  const { inputSize, isMulti, handleClearMultiItem } = useSelectMetaContext();

  const handleClear = ev => {
    ev.preventDefault();
    handleClearMultiItem(value);
  };

  return (
    <motion.li
      className="select__value-item"
      initial={hasExit && { opacity: 0.4, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={hasExit ? { opacity: 0, scale: 0.9 } : undefined}
      transition={{ duration: 0.15 }}
      positionTransition={{ type: 'spring', damping: 300, stiffness: 450 }}
      css={{
        fontSize: theme.fontSizes[inputSize.fontSize],
        width: 'auto',
        position: 'relative',
        float: 'left',
        marginRight: theme.sizes[1],
        userSelect: 'none',
        marginTop: 6,
        ...(isMulti && {
          backgroundColor: hideClear ? theme.colors.primary[200] : theme.colors.gray[200],
          display: 'inline-flex',
          alignItems: 'center',
          lineHeight: 1.65,
          borderRadius: theme.radii.md,
          paddingLeft: theme.sizes[2],
          marginTop: 5,
          paddingRight: hideClear ? theme.sizes[2] : 0
        })
      }}
    >
      <PseudoBox as="span" className="select__value-label">
        {children}
      </PseudoBox>
      {isMulti && !hideClear && (
        <PseudoBox
          as="button"
          type="button"
          className="select__value-close"
          onClick={handleClear}
          outline="none"
          mr={1}
          ml={2}
          lineHeight="1"
          _hover={{
            color: 'danger.500'
          }}
        >
          <FiX className="select__value-close--icon" />
        </PseudoBox>
      )}
    </motion.li>
  );
});

SelectValueItem.displayName = 'SelectValueItem';

export { SelectValueItem };
