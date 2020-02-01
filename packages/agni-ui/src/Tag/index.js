import React, { useState } from 'react';
import { FiX } from 'react-icons/fi';
import { PseudoBox } from '../PseudoBox';
import { Button } from '../Button';

const Tag = ({
  variantColor,
  children,
  closeable,
  isOpen: isOpenProp = true,
  afterClose,
  afterOpen,
  ...rest
}) => {
  const [isOpen, setIsOpen] = useState(() => isOpenProp);
  const bg = `${variantColor}.100`;
  const color = `${variantColor}.900`;

  const handleClick = ev => {
    ev.preventDefault();
    if (isOpen) {
      setIsOpen(false);
      if (afterClose) {
        afterClose(false);
      }
    } else {
      setIsOpen(true);
      if (afterOpen) {
        afterOpen(true);
      }
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <PseudoBox
      d="inline-flex"
      bg={bg}
      color={color}
      rounded="md"
      fontSize="xs"
      fontWeight="semibold"
      alignItems="center"
      px={2}
      py={1}
      lineHeight="1"
      className="tag"
      {...rest}
    >
      {children}
      {closeable && (
        <Button
          onClick={handleClick}
          h="auto"
          minW="auto"
          p="unset"
          ml={2}
          variant="link"
          variantColor={variantColor}
          rounded="full"
          fontSize="xs"
          lineHeight="1"
          color="inherit"
        >
          <FiX />
        </Button>
      )}
    </PseudoBox>
  );
};

Tag.displayName = 'Tag';

export { Tag };
