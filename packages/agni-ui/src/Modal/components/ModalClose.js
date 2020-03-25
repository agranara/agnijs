import React from 'react';
import cn from 'classnames';
import { FiX } from 'react-icons/fi';
import { Button } from '../../Button';
import { useModalContext } from '../ModalContext';

const ModalClose = ({ children, className, onClick, ...rest }) => {
  const { onClose } = useModalContext();

  const handleClick = ev => {
    onClose();
    if (onClick) onClick(ev);
  };

  return (
    <Button
      type="button"
      variant="solid"
      variantColor="gray"
      pos="absolute"
      top={3}
      right={5}
      p={0}
      w="26px"
      h="26px"
      fontSize="18px"
      minW="26px"
      lineHeight="1"
      className={cn(['modal__close', className])}
      onClick={handleClick}
      {...rest}
    >
      {children || <FiX />}
    </Button>
  );
};

ModalClose.displayName = 'ModalClose';

export { ModalClose };
