/** @jsx jsx */
import { jsx } from '@emotion/core';
import { motion } from 'framer-motion';
import { FiX } from 'react-icons/fi';
import { Fragment } from 'react';
import { PseudoBox } from '../../PseudoBox';
import { Text, Heading } from '../../Text';

const alertInitial = { opacity: 0, y: 50, scale: 0.3 };
const alertAnimate = { opacity: 1, y: 0, scale: 1 };
const alertExit = { opacity: 0, scale: 0.5, transition: { duration: 0.2 } };

const BaseAlert = ({
  as: Comp = 'div',
  animate = alertAnimate,
  children,
  closeable,
  description,
  descriptionProps,
  exit = alertExit,
  icon,
  iconProps,
  iconSize = '1rem',
  initial = alertInitial,
  onAnimationComplete,
  onClose,
  positionTransition = false,
  title,
  titleProps,
  variant,
  withPresence = false,
  ...restProps
}) => {
  const iconColor = variant ? `${variant}.500` : 'black';
  const borderColor = variant ? `${variant}.500` : 'black';

  return (
    <motion.div
      positionTransition={positionTransition}
      initial={initial}
      animate={animate}
      exit={withPresence ? exit : undefined}
      onAnimationComplete={onAnimationComplete}
    >
      <PseudoBox
        as={Comp}
        className="alert"
        role="alert"
        pos="relative"
        bg="white"
        shadow="lg"
        borderRadius="md"
        px={3}
        py={2}
        userSelect="none"
        d="flex"
        flexDir="row"
        flexWrap="wrap"
        borderLeftWidth={4}
        borderColor={borderColor}
        {...restProps}
      >
        {children || (
          <Fragment>
            {icon && (
              <PseudoBox
                className="alert__icon"
                alignSelf="center"
                mr={2}
                fontSize={iconSize}
                color={iconColor}
                {...iconProps}
              >
                {icon}
              </PseudoBox>
            )}
            {(title || description) && (
              <PseudoBox className="alert__text-container">
                {title && (
                  <Heading className="alert__title" size="md" fontWeight="semibold" {...titleProps}>
                    {title}
                  </Heading>
                )}
                {description && (
                  <Text className="alert__description" fontSize="md" {...descriptionProps}>
                    {description}
                  </Text>
                )}
              </PseudoBox>
            )}
          </Fragment>
        )}
        {closeable && (
          <PseudoBox
            as="button"
            d="inline-flex"
            type="button"
            className="alert__close"
            onClick={onClose}
            h={6}
            w={6}
            p={0}
            ml="auto"
            rounded="sm"
            fontSize="md"
            textAlign="center"
            alignItems="center"
            justifyContent="center"
            outline="none"
            transition="all 0.2s"
            _hover={{
              transform: 'scale(1.2)'
            }}
          >
            <FiX />
          </PseudoBox>
        )}
      </PseudoBox>
    </motion.div>
  );
};

BaseAlert.displayName = 'BaseAlert';

export { BaseAlert, alertInitial, alertAnimate, alertExit };
