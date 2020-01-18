import React from 'react';
import { Box } from '../Box';

const Text = React.forwardRef(({ children, ...restProps }, ref) => {
  return (
    <Box ref={ref} as="p" fontFamily="body" {...restProps}>
      {children}
    </Box>
  );
});

export { Text };
export default Text;
