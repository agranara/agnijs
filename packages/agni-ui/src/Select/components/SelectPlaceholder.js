import React from 'react';
import { PseudoBox } from '../../PseudoBox';
import { useSelectContext } from '../SelectContext';

const SelectPlaceholder = ({ children }) => {
  const { hasValueOrSearch, inputSize } = useSelectContext();

  return (
    <PseudoBox
      lineHeight={`calc(${inputSize.lineHeight} - 2px)`}
      fontSize={inputSize.fontSize}
      pos="absolute"
      className="select--placeholder"
      userSelect="none"
      color="gray.500"
      d={hasValueOrSearch ? 'none' : undefined}
    >
      {children}
    </PseudoBox>
  );
};

SelectPlaceholder.displayName = 'SelectPlaceholder';

export { SelectPlaceholder };
