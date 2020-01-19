import React, { useMemo, forwardRef } from 'react';
import cn from 'classnames';
import { get } from 'styled-system';
import PseudoBox from '../PseudoBox';
import { useUiTheme } from '../UiProvider';
import { inputSizes } from './sizes';
import { useInputGroupContext } from './InputGroupContext';

const baseProps = {
  display: 'flex',
  alignItems: 'center',
  position: 'relative',
  transition: 'all 0.2s',
  outline: 'none'
};

const readOnlyStyle = {
  _readOnly: {
    bg: 'transparent',
    boxShadow: 'none',
    userSelect: 'all'
  }
};

const boxedStyle = ({ theme, focusBorderColor, errorBorderColor }) => {
  const bg = 'white';
  const borderColor = 'inherit';
  const hoverColor = 'gray.300';

  /**
   * styled-system's get takes 3 args
   * - object or array to read from
   * - key to get
   * - fallback value
   */
  const _focusBorderColor = get(
    theme.colors,
    focusBorderColor,
    focusBorderColor // If color doesn't exist in theme, use it's raw value
  );
  const _errorBorderColor = get(theme.colors, errorBorderColor, errorBorderColor);

  return {
    ...readOnlyStyle,
    border: '1px',
    borderColor,
    bg,
    boxShadow: theme.shadows.input,
    _hover: {
      borderColor: hoverColor
    },
    _disabled: {
      opacity: '0.4',
      cursor: 'not-allowed'
    },
    _focus: {
      borderColor: _focusBorderColor,
      boxShadow: `0 0 0 1px ${_focusBorderColor}`
    },
    _invalid: {
      borderColor: _errorBorderColor,
      boxShadow: `0 0 0 1px ${_errorBorderColor}`
    }
  };
};

const InputText = forwardRef(
  (
    {
      isFocus = false,
      isFullWidth = true,
      isDisabled = false,
      isReadOnly = false,
      isInvalid = false,
      isRequired = false,
      disabled = false,
      readOnly = false,
      invalid = false,
      required = false,
      size = 'md',
      variantType = 'boxed',
      focusBorderColor = 'teal.500',
      errorBorderColor = 'red.500',
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

    const variantProps = useMemo(() => {
      const passedProps = { theme, focusBorderColor, errorBorderColor };

      if (variantType === 'boxed') return { ...boxedStyle(passedProps) };
      if (variantType === 'unstyled')
        return {
          bg: 'transparent',
          px: undefined,
          height: undefined
        };
    }, [variantType, theme, focusBorderColor, errorBorderColor]);

    const disabledProps = useMemo(() => {
      return isDisabled || disabled ? { disabled: true, 'aria-disabled': true } : {};
    }, [isDisabled, disabled]);

    const invalidProps = useMemo(() => {
      return isInvalid || invalid ? { 'aria-invalid': true } : {};
    }, [isInvalid, invalid]);

    const readOnlyProps = useMemo(() => {
      return isReadOnly || readOnly ? { 'aria-readonly': true, readOnly: true } : {};
    }, [isReadOnly, readOnly]);

    const requiredProps = useMemo(() => {
      return isRequired || required ? { required: true, 'aria-required': true } : {};
    }, [isRequired, required]);

    return (
      <PseudoBox
        ref={ref}
        {...baseProps}
        {...sizeProps}
        {...variantProps}
        {...disabledProps}
        {...invalidProps}
        {...readOnlyProps}
        {...requiredProps}
        {...paddingLeftProps}
        {...paddingRightProps}
        w={isFullWidth ? '100%' : undefined}
        {...restProps}
        as="input"
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
