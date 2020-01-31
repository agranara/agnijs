import React from 'react';
import { PseudoBox } from '../../PseudoBox';
import { useSelectContext } from '../SelectContext';

const SelectValueItem = ({ children }) => {
  const { inputSize } = useSelectContext();

  return (
    <PseudoBox
      className="select--value-item"
      as="li"
      pos="relative"
      width="auto"
      float="left"
      mr={1}
      // lineHeight={`calc(${inputSize.lineHeight} - 2px)`}
      fontSize={inputSize.fontSize}
      userSelect="none"
      pt="6px"
    >
      {children}
    </PseudoBox>
  );
};

SelectValueItem.displayName = 'SelectValueItem';

export { SelectValueItem };
