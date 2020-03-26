import React, { forwardRef } from 'react';
import { Box } from '../Box';

const RequiredIndicator = ({ children = '*', ...restProps }) => {
  return (
    <Box as="span" ml={1} color="red.500" aria-hidden="true" {...restProps}>
      {children}
    </Box>
  );
};

RequiredIndicator.displayName = 'RequiredIndicator';

///////////////////////////////////////////////////////////

const InputLabel = forwardRef(({ children, isRow, isRequired, ...props }, ref) => {
  return (
    <Box
      ref={ref}
      className="input-label"
      fontSize="md"
      pr="12px"
      pb="4px"
      opacity={props.isDisabled ? '0.4' : '1'}
      fontWeight="medium"
      textAlign="left"
      verticalAlign="middle"
      display="inline-block"
      as="label"
      pt={isRow ? '5px' : props.pt}
      {...props}
    >
      {children}
      {isRequired && <RequiredIndicator />}
    </Box>
  );
});

InputLabel.displayName = 'InputLabel';

export { RequiredIndicator, InputLabel };
