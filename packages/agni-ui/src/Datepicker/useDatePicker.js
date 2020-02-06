import { useState, useRef } from 'react';
import dayjs from 'dayjs';
import 'dayjs/locale/id';
import { isKeyboardKey } from '../keyboard';
import { useTogglePositioner } from '../Positioner';

const useDatePicker = ({
  value: valueProp,
  onChange,
  isReadOnly,
  isDisabled,
  closeOnClear = true,
  closeOnSelect = true,
  locale = 'id',
  valueFormat = 'YYYY-MM-DD',
  initialOpenPicker = false,
  visualFormat = 'DD MMMM YYYY'
}) => {
  const { current: parser } = useRef(dayjs);
  parser.locale(locale);

  const isEmpty = typeof valueProp !== 'undefined' || valueProp !== null;

  const { current: isControlled } = useRef(isEmpty);

  const dropdownRef = useRef(null);
  const inputRef = useRef(null);

  const [valueState, setValue] = useState(() => {
    if (isEmpty) {
      return parser(valueProp, valueFormat);
    }
    return undefined;
  });

  // When controlled, check value prop, when present, format to dayjs
  // else use undefined as intended
  const value = isControlled
    ? valueProp
      ? parser(valueProp, valueFormat)
      : undefined
    : valueState;

  const prevNextValue = useRef(valueProp);

  const [focusValue, setFocusValue] = useState(() => {
    if (isEmpty) {
      return parser(valueProp, valueFormat);
    }

    return parser();
  });

  const [isOpen, handleIsOpen] = useTogglePositioner({
    refs: [dropdownRef, inputRef],
    initialOpen: initialOpenPicker,
    onOpen: () => {
      if (value && value !== focusValue) {
        setFocusValue(value);
      }
    }
  });

  const updateValue = nextValue => {
    if (prevNextValue.current === nextValue) return;

    const converted = nextValue ? nextValue.format(valueFormat) : nextValue;

    if (!isControlled) setValue(nextValue);
    if (onChange) onChange(converted);

    setFocusValue(nextValue ? nextValue : parser());

    prevNextValue.current = nextValue;

    if (closeOnSelect) {
      handleIsOpen(false);
    }
  };

  const handleChange = nextValue => {
    updateValue(nextValue);
  };

  const handleClear = ev => {
    ev.preventDefault();

    updateValue(undefined);

    if (closeOnClear) {
      handleIsOpen(false);
    }
  };

  const handleKeyDown = ev => {
    const isArrowUp = isKeyboardKey(ev, 'ArrowUp');
    const isArrowDown = isKeyboardKey(ev, 'ArrowDown');
    const isArrowLeft = isKeyboardKey(ev, 'ArrowLeft');
    const isArrowRight = isKeyboardKey(ev, 'ArrowRight');
    const isTab = isKeyboardKey(ev, 'Tab');
    const isEscape = isKeyboardKey(ev, 'Escape');
    // const isShift = ev.shiftKey;
    const isBackspace = isKeyboardKey(ev, 'Backspace');
    const isEnter = isKeyboardKey(ev, 'Enter');

    if (isArrowUp || isArrowDown || isArrowRight || isArrowLeft) {
      ev.preventDefault();
    }

    if (isArrowDown && !isOpen) {
      return handleIsOpen(true);
    }

    if (isArrowUp) {
      setFocusValue(oldFocus => oldFocus.subtract(1, 'week'));
    }
    if (isArrowDown) {
      setFocusValue(oldFocus => oldFocus.add(1, 'week'));
    }
    if (isArrowLeft) {
      setFocusValue(oldFocus => oldFocus.subtract(1, 'day'));
    }
    if (isArrowRight) {
      setFocusValue(oldFocus => oldFocus.add(1, 'day'));
    }
    if (isEnter) {
      updateValue(focusValue);
    }
    if (isBackspace) {
      updateValue(undefined);
    }
    if (isEscape || isTab) {
      handleIsOpen(false);
    }
  };

  return {
    value,
    ref: inputRef,
    parser,
    updateValue,
    input: {
      value: value ? value.format(visualFormat) : '',
      readOnly: isReadOnly,
      disabled: isDisabled,
      autoComplete: 'off',
      spellCheck: 'false',
      isFocused: isOpen,
      isFocus: isOpen,
      onFocus: () => handleIsOpen(true),
      onChange: () => {},
      onKeyDown: handleKeyDown
    },
    isOpen,
    focusValue,
    setFocusValue,
    handleIsOpen,
    onChange: handleChange,
    handleClear,
    dropdownRef
  };
};

export { useDatePicker };
