import React, { forwardRef } from 'react';
import cn from 'classnames';
import { PseudoBox } from '../PseudoBox';
import { useUiTheme } from '../UiProvider';
import { inputSizes } from '../inputSizes';
import { baseProps, boxedStyle, unstyledStyle } from './styles';

const InputText = forwardRef(
  (
    {
      as: Comp = 'input',
      isFocus = false,
      isFullWidth = true,
      readOnly = false,
      disabled = false,
      invalid = false,
      required = false,
      size = 'md',
      variantType = 'boxed',
      focusBorderColor = 'primary.500',
      errorBorderColor = 'danger.500',
      className,
      value,
      defaultValue,
      onChange,
      placeholder,
      pl,
      pr,
      ...restProps
    },
    ref
  ) => {
    const theme = useUiTheme();
    const passedProps = { theme, focusBorderColor, errorBorderColor };

    const inputSize = inputSizes[size];

    return (
      <PseudoBox
        ref={ref}
        as={Comp}
        {...baseProps}
        {...(variantType === 'boxed' && boxedStyle(passedProps))}
        {...(variantType === 'unstyled' && unstyledStyle)}
        {...restProps}
        {...inputSize}
        pl={pl || inputSize.px}
        pr={pr || inputSize.px}
        disabled={disabled}
        aria-disabled={disabled}
        readOnly={readOnly}
        aria-readonly={readOnly}
        aria-invalid={invalid}
        required={required}
        aria-required={required}
        w={isFullWidth ? '100%' : undefined}
        className={cn(['input', isFocus && 'focused', className])}
        value={value}
        defaultValue={defaultValue}
        onChange={onChange}
        placeholder={placeholder}
      />
    );
  }
);

InputText.displayName = 'InputText';

export { InputText };
