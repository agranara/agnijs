import React, { useState, forwardRef } from 'react';
import { Box } from '../Box';
import { inputSizes } from './sizes';
import { useUiTheme } from '../UiProvider';
import { InputGroupContext } from './InputGroupContext';

export const InputGroup = forwardRef(({ children, size = 'md', ...restProps }, ref) => {
  const { sizes } = useUiTheme();
  const [hasLeft, setHasLeft] = useState(false);
  const [hasRight, setHasRight] = useState(false);

  const height = inputSizes[size] && inputSizes[size]['height'];
  const padding = sizes[height];

  return (
    <InputGroupContext.Provider
      value={{
        groupPadding: padding,
        groupSize: size,
        hasLeft,
        hasRight,
        setHasLeft,
        setHasRight
      }}
    >
      <Box ref={ref} d="flex" pos="relative" alignItems="center" {...restProps}>
        {children}
      </Box>
    </InputGroupContext.Provider>
  );
});
