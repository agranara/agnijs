import React, { useState } from 'react';
import { FiCheck, FiInfo, FiAlertCircle, FiX } from 'react-icons/fi';
import { Button } from '../Button';
import { PseudoBox } from '../PseudoBox';
import { Text, Heading } from '../Text';
import { Collapse } from '../Collapse';

const variantIcon = {
  primary: FiCheck,
  info: FiInfo,
  success: FiCheck,
  warning: FiAlertCircle,
  danger: FiX
};

const Alert = ({
  variant = 'info',
  title,
  description,
  icon,
  closeable,
  isOpen: isOpenProp = true,
  afterOpen,
  afterClose
}) => {
  const [isOpen, setIsOpen] = useState(() => isOpenProp);
  const UsedIcon = icon || variantIcon[variant];

  const bg = `${variant}.100`;
  const borderColor = `${variant}.500`;
  const color = `${variant}.900`;

  const handleClick = () => {
    setIsOpen(oldClose => !oldClose);
  };

  const handleAnimationEnd = prop => {
    if (prop && prop.newHeight > 0) {
      if (afterOpen) {
        afterOpen(isOpen);
      }
    } else if (prop && prop.newHeight < 1) {
      if (afterClose) {
        afterClose(isOpen);
      }
    }
  };

  return (
    <Collapse isOpen={isOpen} onAnimationEnd={handleAnimationEnd}>
      <PseudoBox
        className="alert"
        bg={bg}
        borderTopWidth={4}
        roundedBottom="md"
        color={color}
        borderColor={borderColor}
        shadow="md"
        role="alert"
        pos="relative"
        px={4}
        py={3}
        mb={4}
      >
        {closeable && (
          <Button
            className="alert__close"
            onClick={handleClick}
            h={6}
            w={6}
            minW={6}
            px={0}
            py={0}
            pos="absolute"
            top={3}
            right={3}
            variant="solid"
            variantColor={variant}
            rounded="full"
          >
            <FiX />
          </Button>
        )}
        <PseudoBox className="alert__container" d="flex" flexDir="row" flexWrap="nowrap">
          <PseudoBox className="alert__icon" py={1} mr={3} fontSize="lg">
            <UsedIcon />
          </PseudoBox>
          {(title || description) && (
            <PseudoBox className="alert__text-container" pr={3}>
              {title && (
                <Heading className="alert__title" size="md" fontWeight="semibold">
                  {title}
                </Heading>
              )}
              {description && (
                <Text className="alert__description" fontSize="md">
                  {description}
                </Text>
              )}
            </PseudoBox>
          )}
        </PseudoBox>
      </PseudoBox>
    </Collapse>
  );
};

Alert.displayName = 'Alert';

export { Alert };
