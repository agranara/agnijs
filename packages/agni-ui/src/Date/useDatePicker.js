import { useState, useRef } from 'react';
import dayjs from 'dayjs';
import 'dayjs/locale/id';
import { useDropdown } from '../hooks';

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

  const inputRef = useRef();
  const { Dropdown, isOpen, open, close } = useDropdown({
    ref: inputRef,
    initialOpen: initialOpenPicker
  });

  const { current: isControlled } = useRef(!!valueProp);

  const [valueState, setValue] = useState(() => {
    if (!!valueProp) {
      return parser(valueProp, valueFormat);
    }
    return undefined;
  });

  const value = isControlled ? parser(valueProp, valueFormat) : valueState;
  const prevNextValue = useRef(null);

  const [focusValue, setFocusValue] = useState(() => {
    if (!!valueProp) {
      return parser(valueProp, valueFormat);
    }

    return parser();
  });

  const updateValue = nextValue => {
    if (prevNextValue.current === nextValue) return;

    const converted = nextValue ? nextValue.format(valueFormat) : nextValue;

    if (!isControlled) setValue(nextValue);
    if (onChange) onChange(converted);

    setFocusValue(nextValue || parser());

    prevNextValue.current = nextValue;

    if (closeOnSelect) {
      close();
    }
  };

  const handleChange = nextValue => {
    updateValue(nextValue);
  };

  const handleClear = ev => {
    ev.preventDefault();

    updateValue(undefined);

    if (closeOnClear) {
      close();
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
      onFocus: () => {
        open();
      },
      onChange: () => {}
    },
    Dropdown,
    isOpen,
    focusValue,
    setFocusValue,
    open,
    close,
    onChange: handleChange,
    handleClear
  };
};

export { useDatePicker };
export default useDatePicker;
