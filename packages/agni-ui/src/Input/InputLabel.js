/** @jsx jsx */
import { jsx } from '@emotion/core';
import { forwardRef } from 'react';
import { Box } from '../Box';

export const RequiredIndicator = props => {
  return <Box as="span" ml={1} color="red.500" aria-hidden="true" children="*" {...props} />;
};

export const InputLabel = forwardRef(({ children, isRow, ...props }, ref) => {
  return (
    <Box
      ref={ref}
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
      {props.isRequired && <RequiredIndicator />}
    </Box>
  );
});
