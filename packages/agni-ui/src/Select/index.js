import React, { useMemo, forwardRef, useRef, useState, useEffect, useCallback } from 'react';
import get from 'lodash.get';
import AutoSizer from 'react-virtualized-auto-sizer';
import { useForkedRef } from '../utils';
import { useDropdown, useAutoId, useDebounceCallback } from '../hooks';
import { inputSizes } from '../inputSizes';
import { isKeyboardKey } from '../keyboard';
import { SelectContext } from './SelectContext';
import { SelectContainer } from './components/SelectContainer';
import { SelectSelection } from './components/SelectSelection';
import { SelectPlaceholder } from './components/SelectPlaceholder';
import { SelectValueList } from './components/SelectValueList';
import { SelectSearch } from './components/SelectSearch';
import { SelectControl } from './components/SelectControl';
import { SelectOptionList } from './components/SelectOptionList';
import { SelectNotFound } from './components/SelectNotFound';

const safeString = str => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const Select = forwardRef(
  (
    {
      id,
      name,
      value: valueProp,
      options = [],
      onChange,
      className,
      placeholder = 'Select one from option below',
      notFoundText = 'Option not found',
      dropdownWidth,
      dropdownHeight,
      labelKey = 'label',
      valueKey = 'value',
      isMulti = false,
      isClearable = true,
      isSearchable = true,
      isCreatable = false,
      isInitialOpen = false,
      disabled = false,
      readOnly = false,
      maxItemShown = 8,
      size = 'md'
    },
    forwardedRef
  ) => {
    const uid = useAutoId(id);
    const { current: isControlled } = useRef(typeof onChange === 'function');
    const ref = useRef();
    const forkedRef = useForkedRef(ref, forwardedRef);
    const searchRef = useRef();
    const pickerTimeout = useRef();
    const prevNextValue = useRef(valueProp || null);
    const prevNextSearch = useRef('');

    const [search, setSearch] = useState('');
    const [cursor, setCursor] = useState(null);

    // Initial internal value
    const [valueState, setValueState] = useState(() => {
      if (isMulti) {
        if (Array.isArray(valueProp)) {
          return options.filter(opt => valueProp.indexOf(opt[valueKey]) > -1);
        }
        return [];
      }

      if (valueProp) {
        return valueProp;
      }
      return undefined;
    });

    // Debouncing filter options
    const [filterOptions, setFilterOptions] = useState(() => {
      return options || [];
    });

    const setFilterOnSearch = useCallback(
      searchValue => {
        if (!searchValue || searchValue === '') return setFilterOptions(options);
        const regexp = new RegExp(safeString(searchValue), 'i');
        const newOptions = options.filter(
          item => regexp.test(item[labelKey]) || regexp.test(item[valueKey])
        );

        setFilterOptions(newOptions);
      },
      [labelKey, options, valueKey]
    );

    const [debounceFilterOnSearch] = useDebounceCallback({
      callback: setFilterOnSearch,
      delay: 300
    });

    const { Dropdown, isOpen, open, close, reposition } = useDropdown({
      ref,
      initialOpen: isInitialOpen,
      onClose: () => updateSearch('')
    });

    const keyedOptions = useMemo(() => {
      return Array.isArray(options)
        ? options.reduce((acc, cur) => {
            if (cur && cur[valueKey]) {
              return {
                ...acc,
                [get(cur, valueKey)]: cur
              };
            }
            return acc;
          }, {})
        : {};
    }, [options, valueKey]);

    const inputSize = inputSizes[size];
    const isInteractive = !(readOnly || disabled);
    const value = isControlled ? valueProp : valueState;
    const hasValue = value && value !== null;
    const hasValueOrSearch = hasValue || search !== '';

    useEffect(() => {
      const timeout = pickerTimeout.current;
      return () => {
        if (timeout) {
          clearTimeout(timeout);
        }
      };
    }, []);

    useEffect(() => {
      if (prevNextValue.current !== value) {
        prevNextValue.current = value;
      }
    }, [value]);

    const updateValue = nextValue => {
      if (prevNextValue.current === nextValue) return;

      if (!isControlled) setValueState(nextValue);
      setCursor(null);
      if (onChange) onChange(nextValue);
      resetPosition();
      prevNextValue.current = nextValue;
    };

    const updateSearch = nextSearch => {
      if (prevNextSearch.current === nextSearch) return;
      const dom = searchRef.current;
      if (dom) {
        const str = nextSearch;
        dom.style.width = `${str.length * 7 + 12}px`;
      }
      debounceFilterOnSearch(nextSearch);
      setSearch(nextSearch);
      prevNextSearch.current = nextSearch;
    };

    // Set position dropdown
    const resetPosition = () => {
      pickerTimeout.current = setTimeout(() => {
        reposition();
      }, 50);
    };

    // Set search value onChange
    const handleSearch = ev => {
      if (!isInteractive || hasValue) return;
      if (hasValue && !isMulti) return;
      updateSearch(ev.target.value);
    };

    // Handle clear
    const handleClear = () => {
      if (!isInteractive) return;

      if (isMulti) {
        updateValue([]);
      } else {
        updateValue(undefined);
      }
    };

    // Handle focus
    const handleFocus = ev => {
      if (!isInteractive) return;
      open(ev);

      if (searchRef.current) {
        searchRef.current.focus(ev);
      }
    };

    // Handle Change option;
    const handleClickItem = (ev, nextValue) => {
      if (isMulti) {
        const newOptions = [...value, nextValue];
        updateValue(newOptions);
        updateSearch('');
      } else {
        updateValue(nextValue);
        close();
      }
    };

    // Handle keydown
    const handleKeyDown = ev => {
      const isArrowUp = isKeyboardKey(ev, 'ArrowUp');
      const isArrowDown = isKeyboardKey(ev, 'ArrowDown');
      const isTab = isKeyboardKey(ev, 'Tab');
      const isEscape = isKeyboardKey(ev, 'Escape');
      const isShift = ev.shiftKey;
      const isBackspace = isKeyboardKey(ev, 'Backspace');
      const isEnter = isKeyboardKey(ev, 'Enter');

      if (isArrowDown && cursor === null && filterOptions.length > 0) {
        if (!isOpen) {
          handleFocus();
        }

        return setCursor(0);
      }

      if (isArrowUp || isArrowDown || isShift & isTab) {
        ev.preventDefault();
      }

      if (isTab) {
        return close();
      }

      if (isEscape) {
        close();
      }

      if (isBackspace && search === '' && hasValue) {
        // clear
        handleClear();
      }

      if (filterOptions.length > 0) {
        if (isEnter && cursor !== null) {
          const item = filterOptions[cursor][valueKey];
          handleClickItem(ev, item);
        }

        if (isArrowDown && cursor < filterOptions.length - 1) {
          setCursor(oldCursor => oldCursor + 1);
        } else if (isArrowUp && cursor > 0) {
          setCursor(oldCursor => oldCursor - 1);
        }
      }
    };

    return (
      <SelectContext.Provider
        value={{
          uid,
          inputSize,
          isContainerFocus: isOpen && isInteractive,
          onContainerFocus: handleFocus,
          disabled,
          readOnly,
          name,

          hasValue,
          isInteractive,
          isClearable,
          handleClear,

          options: filterOptions,
          keyedOptions,
          isMulti,
          cursor,
          value,
          valueKey,
          labelKey,
          isCreatable,
          handleClickItem,

          hasValueOrSearch,

          search,
          onSearch: handleSearch,
          onSearchKeyDown: handleKeyDown
        }}
      >
        <React.Fragment>
          <SelectContainer className={className} ref={forkedRef}>
            <SelectSelection>
              <SelectPlaceholder>{placeholder}</SelectPlaceholder>
              <SelectValueList>
                {isInteractive && isSearchable && <SelectSearch searchRef={searchRef} />}
              </SelectValueList>
            </SelectSelection>
            <SelectControl />
          </SelectContainer>
          <AutoSizer disableHeight>
            {({ width }) => (
              <Dropdown role="list">
                {filterOptions.length > 0 ? (
                  <SelectOptionList
                    width={dropdownWidth ? dropdownWidth : width}
                    height={dropdownHeight}
                    cursor={cursor}
                    maxItemShown={maxItemShown}
                    inputSize={inputSize}
                    options={filterOptions}
                  />
                ) : (
                  <SelectNotFound width={width}>{notFoundText}</SelectNotFound>
                )}
              </Dropdown>
            )}
          </AutoSizer>
        </React.Fragment>
      </SelectContext.Provider>
    );
  }
);

Select.displayName = 'Select';

export { Select };
