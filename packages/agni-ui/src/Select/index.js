import React, { useMemo, forwardRef, useRef, useState, useEffect, useCallback } from 'react';
import get from 'lodash.get';
import AutoSizer from 'react-virtualized-auto-sizer';
import { Positioner, useTogglePositioner } from '../Positioner';
import { useForkedRef } from '../_hooks/useForkedRef';
import { useAutoId } from '../_hooks/useAutoId';
import { useDebounceCallback } from '../_hooks/useDebounceCallback';
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
    const isControlled = useRef(typeof onChange === 'function');
    const searchRef = useRef();
    const dropdownRef = useRef(null);
    const selectRef = useRef(null);
    const prevNextValue = useRef(valueProp || null);
    const prevNextSearch = useRef('');

    const [search, setSearch] = useState('');
    const [cursor, setCursor] = useState(null);

    const [isOpen, handleIsOpen] = useTogglePositioner({
      refs: [selectRef, dropdownRef],
      initialOpen: isInitialOpen,
      onClose: () => {
        setSearch('');
      }
    });

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
    const value = isControlled.current ? valueProp : valueState;
    const hasValue = value && value !== null;
    const hasValueOrSearch = hasValue || search !== '';

    // Keep prev value same as prop value
    useEffect(() => {
      if (isControlled.current && prevNextValue.current !== valueProp) {
        prevNextValue.current = valueProp;
      }
    }, [valueProp]);

    /** Handlers **/

    // Update value of select
    const updateValue = nextValue => {
      if (prevNextValue.current === nextValue) return;

      if (!isControlled.current) setValueState(nextValue);
      setCursor(null);
      if (onChange) onChange(nextValue);
      prevNextValue.current = nextValue;
    };

    // Update search field
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
    const handleFocus = useCallback(
      ev => {
        if (!isInteractive) return;
        handleIsOpen(true);

        if (searchRef.current) {
          searchRef.current.focus(ev);
        }
      },
      [handleIsOpen, isInteractive]
    );

    // Handle Change option;
    const handleClickItem = (ev, nextValue) => {
      if (isMulti) {
        const newOptions = [...value, nextValue];
        updateValue(newOptions);
        updateSearch('');
      } else {
        updateValue(nextValue);
        handleIsOpen(false);
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
        return handleIsOpen(false);
      }

      if (isEscape) {
        handleIsOpen(false);
      }

      if (isBackspace && search === '' && hasValue) {
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

    const forkedRef = useForkedRef(selectRef, forwardedRef);

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
              <Positioner
                innerRef={dropdownRef}
                triggerRef={selectRef}
                isOpen={isOpen}
                variant="dropdown"
                placement="bottom-start"
                role="list"
              >
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
              </Positioner>
            )}
          </AutoSizer>
        </React.Fragment>
      </SelectContext.Provider>
    );
  }
);

Select.displayName = 'Select';

export { Select };
