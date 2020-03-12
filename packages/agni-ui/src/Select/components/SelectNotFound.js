import React from 'react';
import { PseudoBox } from '../../PseudoBox';

const SelectNotFound = ({ width, children, inputSize }) => {
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
