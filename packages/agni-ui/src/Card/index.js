import React from 'react';
import Box from '../Box';
import { Heading, Text } from '../Text';
import cn from 'classnames';

/////////////////////////////////////////////////////////////////

const Card = ({ children, className, ...cardProps }) => {
  return (
    <Box
      d="flex"
      flexDirection="column"
      flexWrap="wrap"
      shadow="xs"
      w="full"
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
};

Card.displayName = 'Card';

/////////////////////////////////////////////////////////////////

const CardHead = ({ children, className, ...headerProps }) => {
  return (
    <Box
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
};

CardHead.displayName = 'CardHead';

/////////////////////////////////////////////////////////////////

const CardBody = ({ children, className, ...bodyProps }) => {
  return (
    <Box
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
};

CardBody.displayName = 'CardBody';

/////////////////////////////////////////////////////////////////

const CardTitle = ({ children, className, ...titleProps }) => {
  return (
    <Heading
      as="div"
      size="sm"
      fontWeight="semibold"
      {...titleProps}
      className={cn(['card-title', className])}
    >
      {children}
    </Heading>
  );
};

CardTitle.displayName = 'CardTitle';

/////////////////////////////////////////////////////////////////

const CardSubtitle = ({ children, className, ...subtitleProps }) => {
  return (
    <Text as="div" fontSize="sm" {...subtitleProps} className={cn(['card-subtitle', className])}>
      {children}
    </Text>
  );
};

CardSubtitle.displayName = 'CardSubtitle';

/////////////////////////////////////////////////////////////////

const CardOption = ({ children, className, ...optionProps }) => {
  return (
    <Box ml="auto" {...optionProps} className={cn(['card-options', className])}>
      {children}
    </Box>
  );
};

CardOption.displayName = 'CardOption';

/////////////////////////////////////////////////////////////////

const CardSimple = ({
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
}) => {
  const hasHead = !!title || !!subtitle || !!options;

  return (
    <Card {...cardProps}>
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
};

CardSimple.displayName = 'CardSimple';

/////////////////////////////////////////////////////////////////

export { Card, CardHead, CardBody, CardTitle, CardSubtitle, CardOption, CardSimple };
