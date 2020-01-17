import React from 'react';
import { Box } from '../Box';

export const Breadcrumb = ({ children, ...restProps }) => {
  return (
    <Box className="breadcrumb" d="inline-flex" alignItems="center" {...restProps}>
      {children}
    </Box>
  );
};
