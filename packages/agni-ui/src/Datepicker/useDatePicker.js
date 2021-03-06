import { useState, useRef, useMemo, useEffect, useCallback } from 'react';
import dayjs from 'dayjs';
import 'dayjs/locale/id';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import { isKeyboardKey } from '../keyboard';
import { useTogglePositioner } from '../Positioner';

dayjs.extend(weekOfYear);
dayjs.extend(advancedFormat);

const isNullOrEmpty = val => typeof val === 'undefined' || val === null;

const useDatePicker = ({
  value: valueProp,
  onChange,
  isReadOnly,
  isDisabled,
  closeOnClear,
  closeOnSelect,
  locale,
  initialOpenPicker,
  valueFormat: valueFormatProp,
  visualFormat: visualFormatProp,
  mode,
  customParser,
  isClearable
}) => {
  const { current: parser } = useRef(dayjs);
  parser.locale(locale);

  const { current: isControlled } = useRef(!isNullOrEmpty(valueProp));

  const valueFormat = useMemo(() => {
    if (valueFormatProp) {
      return valueFormatProp;
    }
    if (mode === 'year') {
      return 'YYYY';
    }
    if (mode === 'month') {
      return 'YYYY-MM';
    }
    if (mode === 'week') {
      return 'YYYY-w';
    }
    return 'YYYY-MM-DD';
  }, [mode, valueFormatProp]);

  const visualFormat = useMemo(() => {
    if (visualFormatProp) {
      return visualFormatProp;
    }
    if (mode === 'year') {
      return 'YYYY';
    }
    if (mode === 'month') {
      return 'MMMM YYYY';
    }
    if (mode === 'week') {
      return '[Week] w - YYYY';
    }

    return 'DD MMMM YYYY';
  }, [mode, visualFormatProp]);

  const dropdownRef = useRef(null);
  const inputRef = useRef(null);

  const getParsed = useCallback(
    val => {
      if (customParser) {
        return customParser(parser, val);
      }

      if (mode === 'week' && typeof val === 'string' && val) {
        const splitted = val.split('-');
        const year = splitted[0];
        const week = splitted[1];
        return parser(year, 'YYYY').week(week);
      }

      return parser(val, valueFormat);
    },
    [customParser, mode, parser, valueFormat]
  );

  const [valueState, setValue] = useState(() => {
    if (isControlled) {
      return getParsed(valueProp);
    }
    return undefined;
  });

  // When controlled, check value prop, when present, format to dayjs
  // else use undefined as intended
  const value = isControlled ? (valueProp ? getParsed(valueProp) : undefined) : valueState;
  const prevNextValue = useRef(valueProp);

  const [focusValue, setFocusValue] = useState(() => {
    if (isControlled) {
      return getParsed(valueProp);
    }

    return parser();
  });

  useEffect(() => {
    if (prevNextValue.current !== valueProp) {
      prevNextValue.current = valueProp;
      const isValidDate = !isNullOrEmpty(valueProp);
      setValue(isValidDate ? getParsed(valueProp) : undefined);
      setFocusValue(isValidDate ? getParsed(valueProp) : parser());
    }
  }, [getParsed, parser, valueProp]);

  const [isOpen, handleIsOpen] = useTogglePositioner({
    refs: [dropdownRef, inputRef],
    initialOpen: initialOpenPicker,
    onOpen: () => {
      if (value && value !== focusValue) {
        setFocusValue(value);
      }
    }
  });

  const updateValue = (nextValue, shouldClose = true) => {
    if (prevNextValue.current === nextValue) return;

    const isValidDate = !isNullOrEmpty(nextValue);
    const converted = isValidDate ? nextValue.format(valueFormat) : nextValue;

    if (!isControlled) setValue(nextValue);
    if (onChange) onChange(converted);

    setFocusValue(isValidDate ? nextValue : parser());

    prevNextValue.current = nextValue;

    if (closeOnSelect && isOpen && isValidDate && shouldClose) {
      handleIsOpen(false);
      inputRef.current.blur();
    }
  };

  const updateFocus = (increment, isVertically) => {
    let usedIncrement = increment;
    let unit = isVertically ? 'week' : 'day';
    switch (mode) {
      case 'year':
        unit = 'year';
        usedIncrement = isVertically ? 3 * increment : increment;
        break;
      case 'month':
        unit = 'month';
        usedIncrement = isVertically ? 3 * increment : increment;
        break;
      case 'week':
        unit = 'week';
        usedIncrement = increment;
        break;
      default:
        break;
    }
    setFocusValue(oldFocus => oldFocus.add(usedIncrement, unit));
  };

  const handleChange = nextValue => {
    updateValue(nextValue);
  };

  const handleClear = ev => {
    ev.preventDefault();

    updateValue(undefined, false);

    if (closeOnClear) {
      handleIsOpen(false);
      inputRef.current.blur();
    } else if (!isOpen) {
      handleIsOpen(true);
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
      handleIsOpen(true);
    } else {
      if (isArrowUp) {
        updateFocus(-1, true);
      }
      if (isArrowDown) {
        updateFocus(1, true);
      }
      if (isArrowLeft) {
        updateFocus(-1, false);
      }
      if (isArrowRight) {
        updateFocus(1, false);
      }
      if (isEnter) {
        updateValue(focusValue);
      }
      if (isBackspace && isClearable) {
        updateValue(undefined);
      }
      if (isEscape || isTab) {
        handleIsOpen(false);
        inputRef.current.blur();
      }
    }
  };

  return {
    value,
    ref: inputRef,
    parser,
    updateValue,
    input: {
      value: parser.isDayjs(value) ? value.format(visualFormat) : '',
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
    dropdownRef,
    mode
  };
};

export { useDatePicker };
