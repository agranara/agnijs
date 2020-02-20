import React from 'react';
import cn from 'classnames';
import { PseudoBox } from '../../PseudoBox';

const ModalFooter = ({ children, className, ...rest }) => {
  return (
    <PseudoBox
      className={cn(['modal__footer', className])}
      bg="white"
      px={4}
      py={3}
      borderTopWidth={1}
      {...rest}
    >
      {children}
    </PseudoBox>
  );
};

ModalFooter.displayName = 'ModalFooter';

export { ModalFooter };
