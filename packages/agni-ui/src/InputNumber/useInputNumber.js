import { useRef, useState, useEffect, useCallback } from 'react';
import { canUseDOM } from 'exenv';
import { useLongPress } from '../_hooks/useLongPress';
import { isKeyboardKey } from '../keyboard';
import { calculatePrecision } from './util';

const MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER || 2 ** 53 - 1;

const isValid = val => typeof val !== 'undefined' && val !== null;
const isValidStr = val => isValid(val) && val !== '';

const useNumberInput = ({
  value: valueProp,
  onChange,
  onBlur,
  onKeyDown,
  defaultValue,
  thousandSeparator,
  decimalSeparator,
  focusInputOnChange = true,
  clampValueOnBlur = true,
  keepWithinRange = true,
  min = -MAX_SAFE_INTEGER,
  max = MAX_SAFE_INTEGER,
  step: stepProp,
  precision: precisionProp,
  getAriaValueText,
  isReadOnly,
  isInvalid,
  isDisabled
}) => {
  // Reference
  const inputRef = useRef(null);

  const cursor = useRef({
    value: null,
    cursorStart: null,
    cursorEnd: null,
    cursorBefore: null,
    cursorAfter: null
  });

  const lastKeyboard = useRef(null);

  const prevNumberString = useRef(null);
  const prevNumberValue = useRef(null);

  const defaultPrecision = Math.max(calculatePrecision(stepProp), 0);
  const precision = precisionProp || defaultPrecision;

  const getActualRegex = val => {
    if (val === '.') {
      return new RegExp(/\./g);
    }
    if (val === ',') {
      return new RegExp(/,/g);
    }
    return new RegExp('');
  };

  const displayThousandRegex = useRef(new RegExp(/\B(?=(\d{3})+(?!\d))/g));

  const actualThousandRegex = useRef(null);
  const actualDecimalRegex = useRef(null);

  useEffect(() => {
    actualThousandRegex.current = getActualRegex(thousandSeparator);
  }, [thousandSeparator]);

  useEffect(() => {
    actualDecimalRegex.current = getActualRegex(decimalSeparator);
  }, [decimalSeparator]);

  const cleanStrButFirst = useCallback(
    (str, separator = decimalSeparator, regx = actualDecimalRegex.current) => {
      const firstIndex = str.indexOf(separator);
      return str.replace(regx, (v, i) => (i === firstIndex ? v : ''));
    },
    [decimalSeparator]
  );

  const toActualValue = useCallback(
    (strOrNum, usePrecision = false) => {
      if (isValid(strOrNum)) {
        const strValue = `${strOrNum}`;

        if (strValue.length === 0) {
          return null;
        }

        let trimmedVal = strValue.replace(actualThousandRegex.current, '');
        trimmedVal = cleanStrButFirst(trimmedVal).replace(decimalSeparator, '.');

        // Handle minus number
        trimmedVal = cleanStrButFirst(trimmedVal, '-', /-/g);
        if (trimmedVal === '-') {
          return null;
        }

        const decimalIndex = trimmedVal.indexOf('.');
        const backVal = trimmedVal.substring(decimalIndex + 1);
        const fixedNumber = usePrecision ? precision : backVal.length;

        const result = +trimmedVal;
        return Number(result.toFixed(fixedNumber));
      }
      return null;
    },
    [cleanStrButFirst, decimalSeparator, precision]
  );

  const isValueStringIncomplete = useCallback(
    str => {
      const hasDecimal = str.indexOf(decimalSeparator) > -1;
      const hasTrailingZero = str.substr(str.length - 1) === '0';
      const hasTrailingDecimal = str.substr(str.length - 1) === decimalSeparator;

      if (hasDecimal && hasTrailingZero) return true;
      if (hasDecimal && hasTrailingDecimal) return true;
      return false;
    },
    [decimalSeparator]
  );

  const toDisplayValue = useCallback(
    strOrNum => {
      if (isValid(strOrNum)) {
        const strValue = `${strOrNum}`;
        const isIncomplete = isValueStringIncomplete(strValue);

        if (isIncomplete) {
          return strValue;
        }

        const splitter = typeof strOrNum === 'string' ? decimalSeparator : '.';
        const values = strValue.split(splitter);
        const hasDecimal = strValue.indexOf(splitter) > -1;

        const front = values[0] || '';
        /** @type {string} */
        let frontVal = front
          .replace(actualThousandRegex.current, '')
          .replace(displayThousandRegex.current, thousandSeparator);

        if (frontVal.length > 1 && frontVal[0] === '0' && !hasDecimal) {
          frontVal = frontVal.substring(1);
        }

        let back = '';
        if (values[1] && values[1].length > 0) {
          back = values[1].replace(/[^0-9]/g, '');
        }

        return `${frontVal}${hasDecimal ? decimalSeparator : ''}${back}`;
      }
      return '';
    },
    [decimalSeparator, isValueStringIncomplete, thousandSeparator]
  );

  const [{ value, inputValue }, setValue] = useState(() => {
    if (defaultValue != null || valueProp != null) {
      let nextValue = defaultValue || valueProp;
      if (keepWithinRange) {
        nextValue = Math.max(Math.min(nextValue, max), min);
      }

      nextValue = isValid(nextValue) ? nextValue : null;
      return {
        value: nextValue,
        inputValue: toDisplayValue(nextValue)
      };
    }
    return {
      value: null,
      inputValue: toDisplayValue(null)
    };
  });

  useEffect(() => {
    if (prevNumberValue.current !== valueProp) {
      // Since valueProp should be a numeric value, pass directly
      setValue(() => {
        return {
          value: valueProp,
          inputValue: toDisplayValue(valueProp)
        };
      });
    }
  }, [toActualValue, toDisplayValue, valueProp]);

  const setCursor = (start, end) => {
    if (start === undefined || end === undefined || !inputRef.current || !inputRef.current.value) {
      return;
    }

    try {
      const currentStart = inputRef.current.selectionStart;
      const currentEnd = inputRef.current.selectionEnd;

      if (start !== currentStart || end !== currentEnd) {
        inputRef.current.setSelectionRange(start, end);
      }
      // eslint-disable-next-line no-empty
    } catch (e) {}
  };

  const restoreByAfter = str => {
    if (str === undefined) return false;

    const fullStr = inputRef.current.value;
    const index = fullStr.lastIndexOf(str);

    if (index === -1) return false;

    const prevCursorPos = cursor.current.cursorBefore.length;
    if (
      lastKeyboard.current === 46 &&
      cursor.current.cursorBefore.charAt(prevCursorPos - 1) === str[0]
    ) {
      setCursor(prevCursorPos, prevCursorPos);
      return true;
    }

    if (index + str.length === fullStr.length) {
      setCursor(index, index);

      return true;
    }
    return false;
  };

  const partRestoreByAfter = str => {
    if (str === undefined) return false;
    return Array.prototype.some.call(str, (_, start) => {
      const partStr = str.substring(start);

      return restoreByAfter(partStr);
    });
  };

  const [isFocused, setIsFocused] = useState(false);

  const fixCursorKeyboard = () => {
    if (
      !partRestoreByAfter(cursor.current.cursorAfter) &&
      prevNumberString.current !== inputValue
    ) {
      let pos = cursor.current.cursorStart + 1;
      if (!cursor.current.cursorAfter) {
        pos = inputRef.current.value.length;
      } else if (lastKeyboard.current === 46) {
        pos = cursor.current.cursorStart;
      } else if (lastKeyboard.current === 8) {
        pos = cursor.current.cursorStart - 1;
      }
      setCursor(pos, pos);
    } else if (cursor.current.value === inputRef.current.value) {
      switch (lastKeyboard.current) {
        case 8:
          setCursor(cursor.current.cursorStart - 1, cursor.current.cursorStart - 1);
          break;
        case 46:
          setCursor(cursor.current.cursorStart + 1, cursor.current.cursorStart + 1);
          break;
        default:
        // Do nothing
      }
    }
  };

  useEffect(() => {
    try {
      if (isFocused && cursor.current.cursorStart !== null) {
        fixCursorKeyboard();
      }
      lastKeyboard.current = null;
      // eslint-disable-next-line no-empty
    } catch (error) {}
  });

  const isInteractive = !(isReadOnly || isDisabled);

  const validateAndClamp = val => {
    const maxExists = max != null;
    const minExists = min != null;

    let returnedValue = val || value;

    if (maxExists && value > max) {
      returnedValue = max;
    }

    if (minExists && value < min) {
      returnedValue = min;
    }
    return returnedValue;
  };

  const updateValue = (nextValueString, usePrecision = false) => {
    if (prevNumberString.current === nextValueString) return;

    const convertedValue = toActualValue(nextValueString, usePrecision);

    setValue({
      value: convertedValue,
      inputValue: nextValueString
    });

    if (onChange && prevNumberValue.current !== convertedValue) {
      onChange(convertedValue);
    }
    prevNumberValue.current = convertedValue;
    prevNumberString.current = nextValueString;
  };

  const focusInput = () => {
    if (focusInputOnChange && inputRef.current && canUseDOM) {
      inputRef.current.focus();
      // recordCursor();
    }
  };

  const handleIncrement = (step = stepProp) => {
    if (!isInteractive) return;
    let nextValue = (value || 0) + Number(step);

    if (keepWithinRange) {
      nextValue = Math.min(nextValue, max);
    }

    updateValue(toDisplayValue(nextValue), true);
    focusInput();
  };

  const handleDecrement = (step = stepProp) => {
    if (!isInteractive) return;
    let nextValue = (value || 0) - Number(step);

    if (keepWithinRange) {
      nextValue = Math.max(nextValue, min);
    }

    updateValue(toDisplayValue(nextValue), true);
    focusInput();
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const incrementStepperProps = useLongPress(handleIncrement);
  const decrementStepperProps = useLongPress(handleDecrement);

  const handleChange = event => {
    updateValue(toDisplayValue(event.target.value));
  };

  const recordCursor = () => {
    // Record position
    try {
      cursor.current.cursorStart = inputRef.current.selectionStart;
      cursor.current.cursorEnd = inputRef.current.selectionEnd;
      cursor.current.value = inputRef.current.value;
      cursor.current.cursorBefore = inputRef.current.value.substring(0, cursor.current.cursorStart);
      cursor.current.cursorAfter = inputRef.current.value.substring(cursor.current.cursorEnd);
    } catch (e) {
      // Fix error in Chrome:
      // Failed to read the 'selectionStart' property from 'HTMLInputElement'
      // http://stackoverflow.com/q/21177489/3040605
    }
  };

  const isNumberKey = event => {
    const charCode = event.which ? event.which : event.keyCode;

    // console.log(charCode);
    // if (event.key === thousandSeparator) return true;
    if (event.key === decimalSeparator) return true;
    if (charCode === 189 || charCode === 173 || charCode === 109) return true;
    if (isKeyboardKey(event, 'ArrowLeft')) return true;
    if (isKeyboardKey(event, 'ArrowRight')) return true;
    if (isKeyboardKey(event, 'Delete')) return true;
    if (isKeyboardKey(event, 'Backspace')) return true;
    if (event.ctrlKey) return true;
    if (
      charCode > 31 &&
      (charCode < 48 || charCode > 57) &&
      (charCode < 96 || charCode > 105) &&
      charCode !== 110
    )
      return false;
    return true;
  };

  const getIncrementFactor = event => {
    let ratio = 1;
    if (event.metaKey || event.ctrlKey) {
      ratio = 0.1;
    }
    if (event.shiftKey) {
      ratio = 10;
    }
    return ratio;
  };

  const handleKeyDown = event => {
    if (!isNumberKey(event)) {
      event.preventDefault();
    }

    if (!isInteractive) return;

    recordCursor();
    lastKeyboard.current = event.keyCode;

    if (isKeyboardKey(event, 'ArrowUp')) {
      event.preventDefault();
      const ratio = getIncrementFactor(event);
      handleIncrement(ratio * stepProp);
    }

    if (isKeyboardKey(event, 'ArrowDown')) {
      event.preventDefault();
      const ratio = getIncrementFactor(event);
      handleDecrement(ratio * stepProp);
    }

    if (isKeyboardKey(event, 'Home')) {
      event.preventDefault();
      if (min != null) {
        updateValue(toDisplayValue(max));
      }
    }

    if (isKeyboardKey(event, 'End')) {
      event.preventDefault();
      if (max != null) {
        updateValue(toDisplayValue(min));
      }
    }

    // on backspace
    if ((event.keyCode === 8 || event.which === 8) && isValidStr(cursor.current.cursorBefore)) {
      // Handle backspace for decimalSeparator
      const lastCharBeforeCursor =
        cursor.current.cursorBefore[cursor.current.cursorBefore.length - 1];

      const lastCharIsNaN = Number.isNaN(+lastCharBeforeCursor);
      if (!([decimalSeparator, '-'].indexOf(lastCharBeforeCursor) > -1) && lastCharIsNaN) {
        event.preventDefault();
        fixCursorKeyboard();
      }
    }

    // On delete
    if (
      (event.keyCode === 46 || event.which === 46) &&
      isValidStr(cursor.current.cursorAfter) &&
      cursor.current.cursorAfter.length > 0
    ) {
      // Handle decimal for decimalSeparator
      const firstCharAfterCursor = cursor.current.cursorAfter[0];
      const firstCharIsNaN = Number.isNaN(+cursor.current.cursorAfter[0]);

      if (!([decimalSeparator, '-'].indexOf(firstCharAfterCursor) > -1) && firstCharIsNaN) {
        event.preventDefault();
        fixCursorKeyboard();
      }
    }

    if (onKeyDown) {
      const validatedValue = validateAndClamp();
      onKeyDown(event, validatedValue);
    }
  };

  const handleKeyUp = () => {
    recordCursor();
  };

  const handleBlur = ev => {
    setIsFocused(false);
    const val = clampValueOnBlur ? validateAndClamp() : value;

    updateValue(toDisplayValue(val));

    if (onBlur) {
      onBlur(ev, val);
    }
  };

  const isOutOfRange = (value > max || value < min) && isValid(value);
  const ariaValueText = getAriaValueText ? getAriaValueText(value) : null;

  return {
    value,
    isFocused,
    isDisabled,
    isReadOnly,
    incrementStepper: incrementStepperProps,
    decrementStepper: decrementStepperProps,
    incrementButton: {
      onClick: handleIncrement,
      'aria-label': 'add',
      ...(keepWithinRange && {
        disabled: value === max,
        'aria-disabled': value === max
      })
    },
    decrementButton: {
      onClick: handleDecrement,
      'aria-label': 'subtract',
      ...(keepWithinRange && {
        disabled: value === min,
        'aria-disabled': value === min
      })
    },
    input: {
      onChange: handleChange,
      ref: inputRef,
      value: inputValue,
      role: 'spinbutton',
      type: 'text',
      'aria-valuemin': min,
      'aria-valuemax': max,
      'aria-disabled': isDisabled,
      'aria-valuenow': value,
      'aria-invalid': isInvalid || isOutOfRange,
      invalid: isInvalid || isOutOfRange,
      ...(ariaValueText !== null && { 'aria-valuetext': ariaValueText }),
      readOnly: isReadOnly,
      disabled: isDisabled,
      autoComplete: 'off',
      onFocus: handleFocus,
      onBlur: handleBlur,
      onKeyDown: handleKeyDown,
      onKeyUp: handleKeyUp
    }
  };
};

export { useNumberInput };
