import React, { forwardRef } from 'react';
import { useInputNumberContext } from './InputNumberContext';
import { useForkedRef, wrapEvent } from '../utils';
import { InputText } from '../Input/InputText';

const InputNumberField = forwardRef(({ onBlur, onFocus, onKeyDown, onChange, ...props }, ref) => {
  const {
    size,
    input: {
      ref: _ref,
      onBlur: _onBlur,
      onFocus: _onFocus,
      onChange: _onChange,
      onKeyDown: _onKeyDown,
      disabled: isDisabled,
      readOnly: isReadOnly,
      value,
      ...otherInputProps
    }
  } = useInputNumberContext();

  const inputRef = useForkedRef(_ref, ref);
  const handleBlur = wrapEvent(onBlur, _onBlur);
  const handleFocus = wrapEvent(onFocus, _onFocus);
  const handleKeyDown = wrapEvent(onKeyDown, _onKeyDown);
  const handleChange = wrapEvent(onChange, _onChange);

  return (
    <InputText
      ref={inputRef}
      value={value}
      size={size}
      pr={10}
      isReadOnly={isReadOnly}
      isDisabled={isDisabled}
      onBlur={handleBlur}
      onFocus={handleFocus}
      onKeyDown={handleKeyDown}
      onChange={handleChange}
      {...otherInputProps}
      {...props}
    />
  );
});

InputNumberField.displayName = 'InputNumberField';

export { InputNumberField };
