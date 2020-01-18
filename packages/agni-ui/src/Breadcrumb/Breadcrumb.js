import React from 'react';
import { Box } from '../Box';

const Breadcrumb = ({ children, ...restProps }) => {
  return (
    <Box className="breadcrumb" d="inline-flex" alignItems="center" {...restProps}>
      {children}
    </Box>
  );
};

export { Breadcrumb };
export default Breadcrumb;
