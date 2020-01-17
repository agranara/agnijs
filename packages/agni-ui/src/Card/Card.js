import React from 'react';
import { Box } from '../Box';
import { Heading, Text } from '../Text';
import cn from 'classnames';

export const Card = ({
  children,
  cardProps = {},
  title,
  titleProps = {},
  subtitle,
  subtitleProps = {},
  options,
  optionProps = {},
  contentProps = {}
}) => {
  const hasHeader = !!title || !!subtitle || !!options;

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
      className={cn(['card', cardProps.className])}
    >
      {hasHeader && (
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
          className={cn(['card-header'])}
        >
          {title && (
            <Heading
              as="div"
              size="sm"
              fontWeight="semibold"
              {...titleProps}
              className={cn(['card-title', titleProps.className])}
            >
              {title}
            </Heading>
          )}
          {subtitle && (
            <Text
              as="div"
              fontSize="sm"
              {...subtitleProps}
              className={cn(['card-subtitle', subtitleProps.className])}
            >
              {subtitle}
            </Text>
          )}
          {options && (
            <Box ml="auto" {...optionProps} className={cn(['card-options', optionProps.className])}>
              {options}
            </Box>
          )}
        </Box>
      )}
      <Box
        p={3}
        borderBottomLeftRadius="md"
        borderBottomRightRadius="md"
        w="full"
        borderTopLeftRadius={hasHeader ? 0 : 'md'}
        borderTopRightRadius={hasHeader ? 0 : 'md'}
        {...contentProps}
        className={cn(['card-body', contentProps.className])}
      >
        {children}
      </Box>
    </Box>
  );
};
