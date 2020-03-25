import React from 'react';
import cn from 'classnames';
import { FiX } from 'react-icons/fi';
import { Button } from '../../Button';
import { useDrawerContext } from '../DrawerContext';

const DrawerClose = ({ children, className, onClick, ...rest }) => {
  const { onClose } = useDrawerContext();

  const handleClick = ev => {
    onClose();
    if (onClick) onClick(ev);
  };

  return (
    <Button
      type="button"
      className={cn(['drawer__close', className])}
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
      onClick={handleClick}
      {...rest}
    >
      {children || <FiX />}
    </Button>
  );
};

DrawerClose.displayName = 'DrawerClose';

export { DrawerClose };
