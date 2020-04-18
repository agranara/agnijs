/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { forwardRef } from 'react';
import { FiChevronUp, FiChevronDown } from 'react-icons/fi';
import { PseudoBox } from '../PseudoBox';
import { useNumberInput } from './useInputNumber';
import { InputNumberContext } from './InputNumberContext';
import { InputNumberField } from './InputNumberField';
import { InputNumberStepper } from './InputNumberStepper';

const InputNumber = forwardRef(
  (
    {
      value,
      onChange,
      onBlur,
      defaultValue,
      focusInputOnChange,
      clampValueOnBlur,
      keepWithinRange,
      min,
      max,
      step = 1,
      precision = 0,
      getAriaValueText,
      isReadOnly,
      isInvalid,
      isDisabled,
      isFullWidth,
      size = 'md',
      thousandSeparator = ',',
      decimalSeparator = '.',
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
      isDisabled,
      onBlur,
      thousandSeparator,
      decimalSeparator
    });

    return (
      <InputNumberContext.Provider value={{ ...ctx, size }}>
        <PseudoBox
          ref={ref}
          className="input-number"
          d="flex"
          alignItems="stretch"
          w={isFullWidth ? 'full' : null}
          pos="relative"
          aria-readonly={isReadOnly || rest.readOnly}
          aria-disabled={isDisabled || rest.disabled}
          css={css({
            '&:hover .input-number__steppers,&:focus .input-number__steppers': {
              opacity: 1
            },
            '&[aria-readonly=true]:hover .input-number__steppers,&[aria-readonly=true]:focus .input-number__steppers,&[aria-disabled=true]:hover .input-number__steppers,&[aria-disabled=true]:focus .input-number__steppers': {
              opacity: 0
            },
            '& .input-number__steppers': {
              opacity: 0
            }
          })}
        >
          <InputNumberField {...rest} />
          <PseudoBox
            className="input-number__steppers"
            d="flex"
            flexDirection="column"
            aria-hidden
            width="24px"
            margin="1px"
            position="absolute"
            right="0px"
            height="calc(100% - 2px)"
            transition="opacity 0.2s"
          >
            <InputNumberStepper isIncrement>
              <FiChevronUp />
            </InputNumberStepper>
            <InputNumberStepper isDecrement>
              <FiChevronDown />
            </InputNumberStepper>
          </PseudoBox>
        </PseudoBox>
      </InputNumberContext.Provider>
    );
  }
);

InputNumber.displayName = 'InputNumber';

export { InputNumber };
