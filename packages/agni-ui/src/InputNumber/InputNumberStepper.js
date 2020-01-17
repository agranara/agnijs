import React, { forwardRef } from 'react';
import { useInputNumberContext } from './InputNumberContext';
import { PseudoBox } from '../Box';
import styleProps from './styles';

export const InputNumberStepper = forwardRef(
  ({ children, isIncrement, isDecrement, ...restProps }, ref) => {
    const { isDisabled, size, incrementStepper, decrementStepper } = useInputNumberContext();

    return (
      <PseudoBox
        ref={ref}
        display="flex"
        justifyContent="center"
        alignItems="center"
        flex="1"
        transition="all 0.3s"
        role="button"
        tabindex="-1"
        userSelect="none"
        aria-disabled={isDisabled}
        fontSize="15px"
        pointerEvents={isDisabled ? 'none' : undefined}
        cursor="pointer"
        lineHeight="normal"
        {...styleProps({ size })}
        {...(isIncrement && incrementStepper)}
        {...(isDecrement && decrementStepper)}
        {...restProps}
      >
        {children}
      </PseudoBox>
    );
  }
);
