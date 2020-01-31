import React from 'react';
import { PseudoBox } from '../../PseudoBox';

const SelectSelection = ({ children }) => {
  return (
    <PseudoBox
      className="select--selection"
      d="flex"
      alignItems="flex-start"
      maxW="100%"
      flexWrap="wrap"
    >
      {children}
    </PseudoBox>
  );
};

SelectSelection.displayName = 'SelectSelection';

export { SelectSelection };
