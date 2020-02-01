import React, { forwardRef } from 'react';
import { Box } from '../Box';

const Flex = forwardRef(
  ({ justify, align = 'center', wrap = 'wrap', direction = 'row', children, ...rest }, ref) => (
    <Box
      ref={ref}
      display="flex"
      flexDirection={direction}
      alignItems={align}
      justifyContent={justify}
      flexWrap={wrap}
      className="flex"
      {...rest}
    >
      {children}
    </Box>
  )
);

Flex.displayName = 'Flex';

export { Flex };
