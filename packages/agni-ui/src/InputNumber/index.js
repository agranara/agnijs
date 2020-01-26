import React, { forwardRef } from 'react';
import { FiChevronUp, FiChevronDown } from 'react-icons/fi';
import { Box } from '../Box';
import { useNumberInput } from './useInputNumber';
import { InputNumberContext } from './InputNumberContext';
import { InputNumberField } from './InputNumberField';
import { InputNumberStepper } from './InputNumberStepper';

const InputNumber = forwardRef(
  (
    {
      value,
      onChange,
      defaultValue,
      focusInputOnChange,
      clampValueOnBlur,
      keepWithinRange,
      min,
      max,
      step = 1,
      precision,
      getAriaValueText,
      isReadOnly,
      isInvalid,
      isDisabled,
      isFullWidth,
      size = 'md',
      // thousandSeparator = ',',
      // decimalSeparator = '.',
      children,
      ...rest
    },
    ref
  ) => {
    const ctx = useNumberInput({
      value,
      defaultValue,
      onChange,
      focusInputOnChange,
      clampValueOnBlur,
      keepWithinRange,
      min,
      max,
      step,
      precision,
      getAriaValueText,
      isReadOnly,
      isInvalid,
      isDisabled
      // thousandSeparator,
      // decimalSeparator
    });

    return (
      <InputNumberContext.Provider value={{ ...ctx, size }}>
        <Box
          ref={ref}
          d="flex"
          alignItems="stretch"
          w={isFullWidth ? 'full' : null}
          pos="relative"
          {...rest}
        >
          <InputNumberField {...rest} />
          <Box
            d="flex"
            flexDirection="column"
            aria-hidden
            width="24px"
            margin="1px"
            position="absolute"
            right="0px"
            height="calc(100% - 2px)"
          >
            <InputNumberStepper isIncrement>
              <FiChevronUp />
            </InputNumberStepper>
            <InputNumberStepper isDecrement>
              <FiChevronDown />
            </InputNumberStepper>
          </Box>
        </Box>
      </InputNumberContext.Provider>
    );
  }
);

InputNumber.displayName = 'InputNumber';

export { InputNumber };
