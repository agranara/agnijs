import React, { memo } from 'react';
import { PseudoBox } from '../../PseudoBox';

const SelectPlaceholder = memo(({ hasValueOrSearch, inputSize, placeholder }) => {
  return (
    <PseudoBox
      lineHeight={`calc(${inputSize.lineHeight} - 2px)`}
      fontSize={inputSize.fontSize}
      pos="absolute"
      className="select__placeholder"
      userSelect="none"
      color="gray.500"
      d={hasValueOrSearch ? 'none' : undefined}
    >
      {placeholder}
    </PseudoBox>
  );
});

SelectPlaceholder.displayName = 'SelectPlaceholder';

export { SelectPlaceholder };
