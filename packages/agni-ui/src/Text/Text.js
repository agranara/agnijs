import React from 'react';
import { Box } from '../Box';

export const Text = React.forwardRef(({ children, ...restProps }, ref) => {
  return (
    <Box ref={ref} as="p" fontFamily="body" {...restProps}>
      {children}
    </Box>
  );
});
