import React, { memo } from 'react';
import { FiX, FiChevronDown } from 'react-icons/fi';
import { PseudoBox } from '../../PseudoBox';
import { Button } from '../../Button';
import { useUiTheme } from '../../UiProvider/hooks/useUiTheme';
import { useSelectMetaContext } from '../SelectMetaContext';

const SelectControl = memo(() => {
  const theme = useUiTheme();

  const { inputSize, hasValue, isInteractive, isClearable, handleClear } = useSelectMetaContext();

  return (
    <PseudoBox
      d="flex"
      flexWrap="nowrap"
      pos="absolute"
      right={0}
      top={0}
      height={`calc(${theme.sizes[inputSize.height]} - 2px)`}
      alignItems="center"
      px={2}
      className="select__control"
    >
      {hasValue && isInteractive && isClearable ? (
        <Button
          className="select__icon-clear"
          size="xs"
          variantColor="danger"
          p={1}
          onClick={handleClear}
        >
          <FiX />
        </Button>
      ) : (
        <PseudoBox className="select__icon-dropdown" pt="2px" lineHeight="1" h={5} fontSize="1rem">
          <FiChevronDown />
        </PseudoBox>
      )}
    </PseudoBox>
  );
});

SelectControl.displayName = 'SelectControl';

export { SelectControl };
