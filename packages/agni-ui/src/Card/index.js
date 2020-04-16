import React, { forwardRef } from 'react';
import cn from 'classnames';
import { Box } from '../Box';
import { Heading, Text } from '../Text';

/////////////////////////////////////////////////////////////////

const Card = forwardRef(({ children, className, ...cardProps }, forwardedRef) => {
  return (
    <Box
      ref={forwardedRef}
      d="flex"
      flexDirection="column"
      flexWrap="wrap"
      shadow="sm"
      w="full"
      bg="white"
      mb={3}
      borderWidth="1px"
      borderColor="gray.200"
      rounded="md"
      {...cardProps}
      className={cn(['card', className])}
    >
      {children}
    </Box>
  );
});

Card.displayName = 'Card';

/////////////////////////////////////////////////////////////////

const CardHead = forwardRef(({ children, className, ...headerProps }, forwardedRef) => {
  return (
    <Box
      ref={forwardedRef}
      p={3}
      bg="gray.50"
      d="flex"
      flexDir="row"
      flexWrap="wrap"
      borderBottom="1px"
      borderTopLeftRadius="md"
      borderTopRightRadius="md"
      borderBottomColor="gray.200"
      {...headerProps}
      className={cn(['card-head', className])}
    >
      {children}
    </Box>
  );
});

CardHead.displayName = 'CardHead';

/////////////////////////////////////////////////////////////////

const CardBody = forwardRef(({ children, className, ...bodyProps }, forwardedRef) => {
  return (
    <Box
      ref={forwardedRef}
      p={3}
      borderBottomLeftRadius="md"
      borderBottomRightRadius="md"
      w="full"
      borderTopLeftRadius="md"
      borderTopRightRadius="md"
      {...bodyProps}
      className={cn(['card-body', className])}
    >
      {children}
    </Box>
  );
});

CardBody.displayName = 'CardBody';

/////////////////////////////////////////////////////////////////

const CardTitle = forwardRef(({ children, className, ...titleProps }, forwardedRef) => {
  return (
    <Heading
      ref={forwardedRef}
      as="div"
      size="sm"
      fontWeight="semibold"
      {...titleProps}
      className={cn(['card-title', className])}
    >
      {children}
    </Heading>
  );
});

CardTitle.displayName = 'CardTitle';

/////////////////////////////////////////////////////////////////

const CardSubtitle = forwardRef(({ children, className, ...subtitleProps }, forwardedRef) => {
  return (
    <Text
      ref={forwardedRef}
      as="div"
      fontSize="sm"
      {...subtitleProps}
      className={cn(['card-subtitle', className])}
    >
      {children}
    </Text>
  );
});

CardSubtitle.displayName = 'CardSubtitle';

/////////////////////////////////////////////////////////////////

const CardOption = forwardRef(({ children, className, ...optionProps }, forwardedRef) => {
  return (
    <Box ref={forwardedRef} ml="auto" {...optionProps} className={cn(['card-options', className])}>
      {children}
    </Box>
  );
});

CardOption.displayName = 'CardOption';

/////////////////////////////////////////////////////////////////

const CardSimple = forwardRef(
  (
    {
      children,
      cardProps = {},
      headProps = {},
      title,
      titleProps = {},
      subtitle,
      subtitleProps = {},
      options,
      optionProps = {},
      bodyProps = {}
    },
    forwardedRef
  ) => {
    const hasHead = !!title || !!subtitle || !!options;

    return (
      <Card ref={forwardedRef} {...cardProps}>
        {hasHead && (
          <CardHead {...headProps}>
            {title && <CardTitle {...titleProps}>{title}</CardTitle>}
            {subtitle && <CardSubtitle {...subtitleProps}>{subtitle}</CardSubtitle>}
            {options && <CardOption {...optionProps}>{options}</CardOption>}
          </CardHead>
        )}
        <CardBody
          {...bodyProps}
          borderTopLeftRadius={hasHead ? 0 : 'md'}
          borderTopRightRadius={hasHead ? 0 : 'md'}
        >
          {children}
        </CardBody>
      </Card>
    );
  }
);

CardSimple.displayName = 'CardSimple';

/////////////////////////////////////////////////////////////////

export { Card, CardHead, CardBody, CardTitle, CardSubtitle, CardOption, CardSimple };
