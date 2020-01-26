import React, { useState, forwardRef } from 'react';
import { Box } from '../Box';
import { useUiTheme } from '../UiProvider';
import { inputSizes } from '../inputSizes';
import { InputGroupContext } from './InputGroupContext';

const InputGroup = forwardRef(({ children, size = 'md', ...restProps }, ref) => {
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

InputGroup.displayName = 'InputGroup';

export { InputGroup };