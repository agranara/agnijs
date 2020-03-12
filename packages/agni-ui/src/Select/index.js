import React, {
  forwardRef,
  useRef,
  useState,
  useEffect,
  useCallback,
  memo,
  useImperativeHandle,
  useMemo
} from 'react';
import isEqual from 'fast-deep-equal/es6/react';
import { get } from '../_utils/get';
import { Positioner, useTogglePositioner } from '../Positioner';
import { useComponentSize } from '../_hooks/useComponentSize';
import { useAutoId } from '../_hooks/useAutoId';
import { useDebounceCallback } from '../_hooks/useDebounceCallback';
import { isKeyboardKey } from '../keyboard';
import { inputSizes } from '../inputSizes';
import { SelectContext } from './SelectContext';
import { SelectContainer } from './components/SelectContainer';
import { SelectOptionList } from './components/SelectOptionList';
import { SelectNotFound } from './components/SelectNotFound';
import { getKeyedOption } from './util';
import { SelectMetaContext } from './SelectMetaContext';

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
      const keyedRef = useRef(options);

      const [{ width }, selectRef] = useComponentSize();

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

      // Signaling to parent about select value
      useImperativeHandle(forwardedRef, () => ({
        focus: handleFocus,
        value
      }));

      // Debouncing filter options
      const [filterOptions, setFilterOptions] = useState(() => {
        return options || [];
      });

      const makeKeyOptions = useCallback(
        options => {
          return Array.isArray(options)
            ? options.reduce((acc, cur) => {
                const currentValue = get(cur, valueKey);
                const val = getKeyedOption(currentValue);
                return {
                  ...acc,
                  [val]: cur
                };
              }, {})
            : {};
        },
        [valueKey]
      );

      // Keep options in sync with props
      useEffect(() => {
        if (!isEqual(options, prevPropOptions.current)) {
          prevPropOptions.current = options;
          keyedRef.current = makeKeyOptions(options);
          setFilterOptions(options);
        }
      }, [options, makeKeyOptions]);

      // Debounce filter search
      const [debounceFilterOnSearch] = useDebounceCallback({
        callback: searchValue => {
          if (!searchValue || searchValue === '') return setFilterOptions(options);
          const regexp = new RegExp(safeString(searchValue), 'i');
          const newOptions = options.filter(
            item => regexp.test(item[labelKey]) || regexp.test(item[valueKey])
          );

          setFilterOptions(newOptions);
        },
        delay: 300,
        deps: [labelKey, options, valueKey]
      });

      const inputSize = inputSizes[size];
      const isInteractive = !(readOnly || disabled);
      const value = isControlled.current ? valueProp : valueState;
      const hasValue = isMulti
        ? Array.isArray(value) && value.length > 0
        : typeof value !== 'undefined' && value !== null;
      const hasValueOrSearch = hasValue || search !== '';

      // Keep prev value same as prop value
      useEffect(() => {
        if (isControlled.current && prevNextValue.current !== valueProp) {
          prevNextValue.current = valueProp;
        }
      }, [valueProp]);

      // Update value of select
      const updateValue = useCallback(
        nextValue => {
          if (prevNextValue.current === nextValue) return;

          if (!isControlled.current) setValueState(nextValue);
          setCursor(null);
          if (onChange) onChange(nextValue);
          prevNextValue.current = nextValue;
        },
        [onChange]
      );

      // Update search field
      const updateSearch = useCallback(
        nextSearch => {
          if (prevNextSearch.current === nextSearch) return;
          const dom = searchRef.current;
          if (dom) {
            const str = nextSearch;
            dom.style.width = `${str.length * 7 + 12}px`;
          }
          debounceFilterOnSearch(nextSearch);
          setSearch(nextSearch);
          prevNextSearch.current = nextSearch;
        },
        [debounceFilterOnSearch]
      );

      // Set search value onChange
      const handleSearch = useCallback(
        ev => {
          if (!isInteractive || (hasValue && !isMulti)) {
            return;
          }
          updateSearch(ev.target.value);
        },
        [hasValue, isInteractive, isMulti, updateSearch]
      );

      // Handle clear
      const handleClear = useCallback(() => {
        if (!isInteractive) return;

        if (isMulti) {
          updateValue([]);
        } else {
          updateValue(undefined);
        }
      }, [isInteractive, isMulti, updateValue]);

      // Handle clear multi item
      const handleClearMultiItem = useCallback(
        valueToRemove => {
          if (Array.isArray(value)) {
            updateValue(value.filter(val => val !== valueToRemove));
          }
        },
        [updateValue, value]
      );

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
      const handleClickItem = useCallback(
        (ev, nextValue) => {
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
        },
        [handleIsOpen, isMulti, updateSearch, updateValue, value]
      );

      // Handle keydown
      const handleKeyDown = useCallback(
        ev => {
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
        },
        [
          cursor,
          filterOptions,
          handleClear,
          handleClickItem,
          handleFocus,
          handleIsOpen,
          hasValue,
          isMulti,
          isOpen,
          search,
          valueKey
        ]
      );

      // Context that rarely change
      const metaCtx = useMemo(
        () => ({
          uid,
          inputSize,
          disabled,
          readOnly,
          name,
          placeholder,

          hasValue,
          hasValueOrSearch,

          isContainerFocus: isOpen && isInteractive,
          isInteractive,
          isSearchable,
          isClearable,
          isMulti,
          isCreatable,

          keyedOptions: keyedRef.current,
          labelKey,
          valueKey,

          // Handler
          handleClear,
          handleClearMultiItem,
          onSearch: handleSearch,
          handleClickItem,

          // Search ref
          searchRef
        }),
        [
          disabled,
          handleClear,
          handleClearMultiItem,
          handleClickItem,
          handleSearch,
          hasValue,
          hasValueOrSearch,
          inputSize,
          isClearable,
          isCreatable,
          isInteractive,
          isMulti,
          isOpen,
          isSearchable,
          labelKey,
          name,
          placeholder,
          readOnly,
          uid,
          valueKey
        ]
      );

      // Context that often change
      const valueCtx = useMemo(
        () => ({
          options: filterOptions,
          value,
          search,
          cursor
        }),
        [cursor, filterOptions, search, value]
      );

      return (
        <SelectMetaContext.Provider value={metaCtx}>
          <SelectContext.Provider value={valueCtx}>
            <React.Fragment>
              <SelectContainer
                ref={selectRef}
                className={className}
                onContainerFocus={handleFocus}
                onSearchKeyDown={handleKeyDown}
              />
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
                  <SelectNotFound width={width} inputSize={inputSize}>
                    {notFoundText}
                  </SelectNotFound>
                )}
              </Positioner>
            </React.Fragment>
          </SelectContext.Provider>
        </SelectMetaContext.Provider>
      );
    }
  )
);

Select.displayName = 'Select';

export { Select };
