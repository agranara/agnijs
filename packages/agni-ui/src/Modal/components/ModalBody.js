import React from 'react';
import cn from 'classnames';

import { PseudoBox } from '../../PseudoBox';

const ModalBody = ({ children, className, ...rest }) => {
  return (
    <PseudoBox
      className={cn(['modal__body', className])}
      flex="1 1 0%"
      bg="white"
      px={4}
      py={2}
      overflowY="auto"
      {...rest}
    >
      {children}
    </PseudoBox>
  );
};

ModalBody.displayName = 'ModalBody';

export { ModalBody };
