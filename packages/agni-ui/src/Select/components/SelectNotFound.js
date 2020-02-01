import React from 'react';
import { PseudoBox } from '../../PseudoBox';
import { useSelectContext } from '../SelectContext';

const SelectNotFound = ({ width, children }) => {
  const { inputSize } = useSelectContext();

  return (
    <PseudoBox
      className="select__not-found"
      px={inputSize.px}
      fontSize={inputSize.fontSize}
      lineHeight={inputSize.lineHeight}
      textAlign="center"
      userSelect="none"
      transition="all 0.2s"
      tabIndex={0}
      outline="none"
      style={{
        width
      }}
    >
      {children}
    </PseudoBox>
  );
};

SelectNotFound.displayName = 'SelectNotFound';

export { SelectNotFound };
