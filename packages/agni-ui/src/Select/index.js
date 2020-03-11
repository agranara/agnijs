import React, { useMemo, forwardRef, useRef, useState, useEffect, useCallback, memo } from 'react';
import isEqual from 'fast-deep-equal/es6/react';
import { get } from '../_utils/get';
import { Positioner, useTogglePositioner } from '../Positioner';
import { useForkedRef } from '../_hooks/useForkedRef';
import { useComponentSize } from '../_hooks/useComponentSize';
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

const Select = memo(
  forwardRef(
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
        size = 'md',
        positionerProps
      },
      forwardedRef
    ) => {
      const uid = useAutoId(id);
      const isControlled = useRef(typeof onChange === 'function');
      const searchRef = useRef(null);
      const dropdownRef = useRef(null);

      const selectRef = useRef(null);
      const forkedRef = useForkedRef(selectRef, forwardedRef);

      const [width] = useComponentSize(selectRef);

      const prevNextValue = useRef(valueProp || null);
      const prevNextSearch = useRef('');
      const prevPropOptions = useRef(options);

      const [search, setSearch] = useState('');
      const [cursor, setCursor] = useState(null);

      const [isOpen, handleIsOpen] = useTogglePositioner({
        refs: [selectRef, dropdownRef],
        initialOpen: isInitialOpen,
        onClose: () => {
          updateSearch('');
        }
      });

      // Initial internal value
      const [valueState, setValueState] = useState(() => {
        if (isMulti) {
          if (Array.isArray(valueProp)) {
            return options
              .filter(opt => valueProp.indexOf(opt[valueKey]) > -1)
              .map(opt => opt[valueKey]);
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

      // Keep options in sync with props
      useEffect(() => {
        if (!isEqual(options, prevPropOptions.current)) {
          prevPropOptions.current = options;
          setFilterOptions(options);
        }
      }, [options]);

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
      const hasValue = isMulti ? Array.isArray(value) && value.length > 0 : value && value !== null;
      const hasValueOrSearch = hasValue || search !== '';

      // Keep prev value same as prop value
      useEffect(() => {
        if (isControlled.current && prevNextValue.current !== valueProp) {
          prevNextValue.current = valueProp;
        }
      }, [valueProp]);

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
        if (!isInteractive || (hasValue && !isMulti)) {
          return;
        }
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

      // Handle clear multi item
      const handleClearMultiItem = valueToRemove => {
        if (Array.isArray(value)) {
          updateValue(value.filter(val => val !== valueToRemove));
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
          let newOptions = [];
          if (Array.isArray(value)) {
            newOptions =
              value.indexOf(nextValue) > -1
                ? value.filter(val => val !== nextValue)
                : [...value, nextValue];
          } else {
            newOptions = [nextValue];
          }
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
          if (isMulti) {
          } else {
            handleClear();
          }
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
            handleClearMultiItem,

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
            <Positioner
              innerRef={dropdownRef}
              triggerRef={selectRef}
              isOpen={isOpen}
              placement="bottom-start"
              role="list"
              {...positionerProps}
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
          </React.Fragment>
        </SelectContext.Provider>
      );
    }
  )
);

Select.displayName = 'Select';

export { Select };
