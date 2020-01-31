import React from 'react';
import { FiX, FiChevronDown } from 'react-icons/fi';
import { PseudoBox } from '../../PseudoBox';
import { useSelectContext } from '../SelectContext';
import { Button } from '../../Button';

const SelectControl = () => {
  const { inputSize, hasValue, isInteractive, isClearable, handleClear } = useSelectContext();

  return (
    <PseudoBox
      d="flex"
      flexWrap="nowrap"
      pos="absolute"
      right={0}
      top={0}
      height={inputSize.height}
      alignItems="center"
      px={2}
      className="select--control"
    >
      {hasValue && isInteractive && isClearable ? (
        <Button
          className="select--icon-clear"
          size="xs"
          variantColor="danger"
          p={1}
          onClick={handleClear}
        >
          <FiX />
        </Button>
      ) : (
        <PseudoBox className="select--icon-dropdown" pt="2px" lineHeight="1" h={5} fontSize="1rem">
          <FiChevronDown />
        </PseudoBox>
      )}
    </PseudoBox>
  );
};

SelectControl.displayName = 'SelectControl';

export { SelectControl };
