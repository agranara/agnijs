import React, { useContext, useEffect } from 'react';
import { InputGroupContext } from './InputGroupContext';
import { Box } from '../Box';
import { inputSizes } from './sizes';

export const InputInside = ({
  disablePointerEvents = false,
  size = 'md',
  placement = 'left',
  children,
  ...restProps
}) => {
  const { hasLeft, hasRight, groupSize, setHasLeft, setHasRight } = useContext(InputGroupContext);

  useEffect(() => {
    if (placement === 'left' && !hasLeft) {
      setHasLeft(true);
    } else if (placement === 'right' && !hasRight) {
      setHasRight(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [placement, hasLeft, hasRight]);

  const usedSize = groupSize || size;
  const height = inputSizes[usedSize] && inputSizes[usedSize]['height'];
  const fontSize = inputSizes[usedSize] && inputSizes[usedSize]['fontSize'];
  const placementProp = { [placement]: '0' };

  return (
    <Box
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
