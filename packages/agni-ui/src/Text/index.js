import React, { forwardRef } from 'react';
import { Box } from '../Box';

const sizes = {
  '2xl': ['4xl', null, '5xl'],
  xl: ['3xl', null, '4xl'],
  lg: ['xl', null, '2xl'],
  md: 'lg',
  sm: 'md',
  xs: 'sm'
};

const Heading = forwardRef(({ size = 'xl', ...props }, ref) => (
  <Box
    ref={ref}
    as="h2"
    fontSize={sizes[size]}
    lineHeight="shorter"
    fontWeight="semibold"
    fontFamily="heading"
    {...props}
  />
));

Heading.displayName = 'Heading';

//////////////////////////////////////////////////////////

const Text = forwardRef(({ children, ...restProps }, ref) => {
  return (
    <Box ref={ref} as="p" fontFamily="body" {...restProps}>
      {children}
    </Box>
  );
});

Text.displayName = 'Text';

export { Heading, Text };
