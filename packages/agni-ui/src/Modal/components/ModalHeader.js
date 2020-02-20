import React from 'react';
import cn from 'classnames';
import { useModalContext } from '../ModalContext';
import { PseudoBox } from '../../PseudoBox';

const ModalHeader = ({ children, className, ...rest }) => {
  const { titleId } = useModalContext();

  return (
    <PseudoBox
      as="h2"
      px={4}
      py={3}
      bg="white"
      id={titleId}
      fontWeight="semibold"
      lineHeight="tall"
      className={cn(['modal__header', className])}
      fontSize="lg"
      borderBottomWidth={1}
      {...rest}
    >
      {children}
    </PseudoBox>
  );
};

ModalHeader.displayName = 'ModalHeader';

export { ModalHeader };
