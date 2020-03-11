/** @jsx jsx */
import { jsx } from '@emotion/core';
import { motion } from 'framer-motion';
import { FiX } from 'react-icons/fi';
import { PseudoBox } from '../../PseudoBox';
import { useSelectContext } from '../SelectContext';
import { useUiTheme } from '../../UiProvider/hooks/useUiTheme';

const SelectValueItem = ({ children, value, hasExit }) => {
  const theme = useUiTheme();
  const { inputSize, isMulti, handleClearMultiItem } = useSelectContext();

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
          backgroundColor: theme.colors.gray[200],
          display: 'inline-flex',
          alignItems: 'center',
          lineHeight: 1.65,
          borderRadius: theme.radii.md,
          paddingLeft: theme.sizes[2],
          marginTop: 5
        })
      }}
    >
      <PseudoBox as="span" className="select__value-label">
        {children}
      </PseudoBox>
      {isMulti && (
        <PseudoBox
          as="button"
          type="button"
          className="select__value-close"
          onClick={() => handleClearMultiItem(value)}
          outline="none"
          mr={1}
          ml={2}
          lineHeight="1"
          _hover={{
            color: 'danger.500'
          }}
        >
          <FiX />
        </PseudoBox>
      )}
    </motion.li>
  );
};

SelectValueItem.displayName = 'SelectValueItem';

export { SelectValueItem };
