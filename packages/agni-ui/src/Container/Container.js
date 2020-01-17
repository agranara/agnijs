import React from 'react';
import { Box } from '../Box';

export const Container = ({ isFluid, children, ...restProps }) => {
  const props = {
    px: 3
  };

  if (!isFluid) {
    props.maxW = ['containers.sm', 'containers.md', 'containers.lg', 'containers.xl'];
    props.mx = 'auto';
  }

  return (
    <Box {...props} {...restProps}>
      {children}
    </Box>
  );
};
