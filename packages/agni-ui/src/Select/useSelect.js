import { useRef, useState } from 'react';
import { useDropdown } from '../hooks';

// TODO: Use later to refactor Select in same folder as this
export const useSelect = ({
  value: valueProp,
  onChange,
  defaultValue,
  isReadOnly,
  isDisabled,
  size = 'md',
  options,
  valueKey,
  labelKey,
  isMulti,
  isCreateable
}) => {
  const inputRef = useRef();
  const { Dropdown, open, close, isOpen } = useDropdown({ ref: inputRef });

  const { current: isControlled } = useRef(!!valueProp);

  const [search, setSearch] = useState('');
  const [valueState] = useState(() => {
    if (valueProp && isMulti) {
      return Array.isArray(valueProp) ? valueProp : [valueProp];
    }

    if (valueProp && !isMulti) {
      return valueProp;
    }
    if (isMulti) {
      return [];
    }

    return undefined;
  });

  const value = isControlled ? valueProp : valueState;

  const handleSearch = ev => {
    setSearch(ev.target.value);
  };

  return {
    value,
    search,
    ref: inputRef,
    input: {
      readOnly: isReadOnly,
      disabled: isDisabled,
      autoComplete: 'off',
      spellCheck: 'false',
      isFocused: isOpen,
      isFocus: isOpen,
      onFocus: () => {
        open();
      },
      onChange: handleSearch
    },
    Dropdown,
    isOpen,
    open,
    close
  };
};
