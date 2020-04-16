import { useRef, useState } from 'react';
import { canUseDOM } from 'exenv';
import { useLongPress } from '../_hooks/useLongPress';
import { isKeyboardKey } from '../keyboard';
import { preventNonNumberKey, roundToPrecision, calculatePrecision } from './util';

const useNumberInput = ({
  value: valueProp,
  onChange,
  onBlur,
  defaultValue,
  thousandSeparator,
  decimalSeparator,
  focusInputOnChange = true,
  clampValueOnBlur = true,
  keepWithinRange = true,
  min = -Infinity,
  max = Infinity,
  step: stepProp = 1,
  precision: precisionProp = 0,
  getAriaValueText,
  isReadOnly,
  isInvalid,
  isDisabled
}) => {
  const { current: isControlled } = useRef(typeof onChange === 'function');

  const defaultPrecision = Math.max(calculatePrecision(stepProp), 0);
  const precision = precisionProp || defaultPrecision;

  const [valueState, setValue] = useState(() => {
    if (defaultValue != null) {
      let nextValue = defaultValue;
      if (keepWithinRange) {
        nextValue = Math.max(Math.min(nextValue, max), min);
      }
      nextValue = roundToPrecision(nextValue, precision);
      return nextValue;
    }
    return '';
  });

  const [isFocused, setIsFocused] = useState(false);

  const value = isControlled ? valueProp : valueState;
  const isInteractive = !(isReadOnly || isDisabled);
  const inputRef = useRef();

  const prevNextValue = useRef(null);

  const shouldConvertToNumber = value => {
    if (typeof value !== 'string') return false;

    const hasDot = value.indexOf(decimalSeparator) > -1;
    const hasTrailingZero = value.substr(value.length - 1) === '0';
    const hasTrailingDecimal = value.substr(value.length - 1) === decimalSeparator;
    if (hasDot && hasTrailingZero) return false;
    if (hasDot && hasTrailingDecimal) return false;
    return true;
  };

  const toInt = val => {
    if (val !== null && val !== undefined) {
      const values = val.toString().split(decimalSeparator);
      const front = values[0] || '0';
      const back = values[1] || '0';

      const frontVal = front.split(thousandSeparator).join('');
      const backVal = back.split(thousandSeparator).join('');

      const decimal = +backVal * (1 / 10 ** backVal.length);

      return +frontVal + decimal;
    }
    return 0;
  };

  const toString = val => {
    if (val !== null && val !== undefined) {
      const strValue = val.toString();
      const values = strValue.split(typeof val === 'string' ? decimalSeparator : '.');
      const front = values[0] || '0';
      let back = '';
      if (values[1]) {
        back = `${decimalSeparator}${values[1]}`;
      } else if (strValue.indexOf(decimalSeparator) > -1) {
        back = decimalSeparator;
      }

      const frontVal = front
        .split(thousandSeparator)
        .join('')
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, `$1${thousandSeparator}`);

      return `${frontVal}${back}`;
    }
    return '0';
  };

  const updateValue = nextValue => {
    //eslint-disable-next-line
    if (prevNextValue.current == nextValue) return;

    const converted = shouldConvertToNumber(nextValue) ? toInt(nextValue) : nextValue;

    if (!isControlled) setValue(converted);
    if (onChange) onChange(converted);

    prevNextValue.current = nextValue;
  };

  const handleIncrement = (step = stepProp) => {
    if (!isInteractive) return;
    let nextValue = Number(value) + Number(step);

    if (keepWithinRange) {
      nextValue = Math.min(nextValue, max);
    }

    nextValue = roundToPrecision(nextValue, precision);
    updateValue(nextValue);

    focusInput();
  };

  const handleDecrement = (step = stepProp) => {
    if (!isInteractive) return;
    let nextValue = Number(value) - Number(step);

    if (keepWithinRange) {
      nextValue = Math.max(nextValue, min);
    }

    nextValue = roundToPrecision(nextValue, precision);
    updateValue(nextValue);

    focusInput();
  };

  const focusInput = () => {
    if (focusInputOnChange && inputRef.current && canUseDOM) {
      requestAnimationFrame(() => {
        inputRef.current.focus();
      });
    }
  };

  const incrementStepperProps = useLongPress(handleIncrement);
  const decrementStepperProps = useLongPress(handleDecrement);

  const handleChange = event => {
    updateValue(event.target.value);
  };

  const handleKeyDown = event => {
    preventNonNumberKey(event);
    if (!isInteractive) return;
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
        updateValue(max);
      }
    }
    if (isKeyboardKey(event, 'End')) {
      event.preventDefault();
      if (max != null) {
        updateValue(min);
      }
    }
    if (event.keyCode === 65 && event.ctrlKey) {
      event.target.select();
    }
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

  const validateAndClamp = ev => {
    const maxExists = max != null;
    const minExists = min != null;

    let returnedValue = value;

    if (maxExists && value > max) {
      updateValue(max);
      returnedValue = max;
    }

    if (minExists && value < min) {
      updateValue(min);
      returnedValue = min;
    }

    if (onBlur) {
      onBlur(ev, returnedValue);
    }
  };

  const handleBlur = ev => {
    setIsFocused(false);
    if (clampValueOnBlur) {
      validateAndClamp(ev);
    } else if (onBlur) {
      onBlur(ev, value);
    }
  };

  const isOutOfRange = value > max || value < min;
  const ariaValueText = getAriaValueText ? getAriaValueText(value) : null;

  return {
    value: value,
    isFocused,
    isDisabled,
    isReadOnly,
    incrementStepper: incrementStepperProps,
    decrementStepper: decrementStepperProps,
    incrementButton: {
      onClick: () => handleIncrement(),
      'aria-label': 'add',
      ...(keepWithinRange && {
        disabled: value === max,
        'aria-disabled': value === max
      })
    },
    decrementButton: {
      onClick: () => handleDecrement(),
      'aria-label': 'subtract',
      ...(keepWithinRange && {
        disabled: value === min,
        'aria-disabled': value === min
      })
    },
    input: {
      onChange: handleChange,
      onKeyDown: handleKeyDown,
      ref: inputRef,
      value: toString(value),
      role: 'spinbutton',
      type: 'text',
      'aria-valuemin': min,
      'aria-valuemax': max,
      'aria-disabled': isDisabled,
      'aria-valuenow': value,
      'aria-invalid': isInvalid || isOutOfRange,
      ...(ariaValueText !== null && { 'aria-valuetext': ariaValueText }),
      readOnly: isReadOnly,
      disabled: isDisabled,
      autoComplete: 'off',
      onFocus: () => {
        setIsFocused(true);
      },
      onBlur: handleBlur
    }
  };
};

export { useNumberInput };
