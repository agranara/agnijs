import React from 'react';
import { Box } from '../Box';
import { inputSizes } from '../inputSizes';

const InputInside = ({
  disablePointerEvents = false,
  size = 'md',
  placement = 'left',
  children,
  ...restProps
}) => {
  const height = inputSizes[size] && inputSizes[size]['height'];
  const fontSize = inputSizes[size] && inputSizes[size]['fontSize'];
  const placementProp = { [placement]: '0' };

  return (
    <Box
      className="input-inside"
      display="flex"
      alignItems="center"
      justifyContent="center"
      position="absolute"
      height={height}
      width={height}
      fontSize={fontSize}
      top="0"
      zIndex={1}
      {...(disablePointerEvents && { pointerEvents: 'none' })}
      {...placementProp}
      {...restProps}
    >
      {children}
    </Box>
  );
};

InputInside.displayName = 'InputInside';

export { InputInside };
