import React, { useMemo, forwardRef } from 'react';
import cn from 'classnames';
import { PseudoBox } from '../PseudoBox';
import { useUiTheme } from '../UiProvider';
import { inputSizes } from '../inputSizes';
import { useInputGroupContext } from '../InputGroup/InputGroupContext';
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
    const { hasLeft, groupPadding, hasRight, groupSize } = useInputGroupContext();
    const passedProps = { theme, focusBorderColor, errorBorderColor };

    const paddingLeftProps = useMemo(() => {
      const result = {};
      if (pl) {
        result.pl = pl;
      } else if (hasLeft) {
        result.pl = groupPadding;
      }
      return result;
    }, [groupPadding, hasLeft, pl]);

    const paddingRightProps = useMemo(() => {
      const result = {};
      if (pr) {
        result.pr = pr;
      } else if (hasRight) {
        result.pr = groupPadding;
      }
      return result;
    }, [groupPadding, hasRight, pr]);

    const sizeProps = useMemo(() => {
      const usedSize = groupSize ? groupSize : size;
      return { ...inputSizes[usedSize] };
    }, [groupSize, size]);

    return (
      <PseudoBox
        ref={ref}
        as={Comp}
        {...baseProps}
        {...sizeProps}
        {...(variantType === 'boxed' && boxedStyle(passedProps))}
        {...(variantType === 'unstyled' && unstyledStyle)}
        {...paddingLeftProps}
        {...paddingRightProps}
        {...restProps}
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
