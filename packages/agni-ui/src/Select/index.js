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
import { Box } from '../Box';
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

function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}

const Select = memo(
  forwardRef(
    (
      {
        id,
        name,
        value: valueProp,
        options = [],
        onChange,
        onSearch,
        className,
        placeholder = 'Select one from option below',
        notFoundText = 'Option not found',
        dropdownWidth,
        dropdownHeight,
        labelKey = 'label',
        valueKey = 'value',
        isMulti = false,
        hasMultiControl = false,
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

      const [{ width }, selectRef] = useComponentSize();

      const prevNextValue = useRef(valueProp || null);
      const prevNextSearch = useRef('');
      const prevPropOptions = useRef(options);

      const [search, setSearch] = useState('');
      const [cursor, setCursor] = useState(null);

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

      const makeKeyOptions = useCallback(
        opts => {
          if (Array.isArray(opts)) {
            const reduced = {};
            for (let j = 0; j < opts.length; j += 1) {
              const opt = opts[j];
              reduced[getKeyedOption(get(opt, valueKey))] = { ...opt, cursor: j };
            }
            return reduced;
          }

          return {};
        },
        [valueKey]
      );

      // Keep options in sync with props
      const keyedRef = useRef(makeKeyOptions(options));
      useEffect(() => {
        const equal = isEqual(options, prevPropOptions.current);
        if (!equal) {
          prevPropOptions.current = options;
          keyedRef.current = makeKeyOptions(options);
          setFilterOptions(options);
        }
      }, [options, makeKeyOptions]);

      // Debounce filter search
      const [debounceFilterOnSearch] = useDebounceCallback({
        callback: searchValue => {
          let hasResult = false;
          if (onSearch) {
            const newOptions = onSearch(searchValue, options);
            if (Array.isArray(newOptions)) {
              hasResult = true;
              setFilterOptions(newOptions);
            }
          }

          if (!hasResult) {
            if (!searchValue || searchValue === '') {
              setFilterOptions(options);
            } else {
              const regexp = new RegExp(safeString(searchValue), 'i');
              const newOptions = options.filter(
                item => regexp.test(item[labelKey]) || regexp.test(item[valueKey])
              );

              setFilterOptions(newOptions);
            }
          }
        },
        delay: 300,
        deps: [labelKey, options, onSearch, valueKey]
      });

      const inputSize = useMemo(() => inputSizes[size], [size]);
      const isInteractive = useMemo(() => !(readOnly || disabled), [disabled, readOnly]);
      const value = isControlled.current ? valueProp : valueState;
      const hasValue = useMemo(() => {
        return isMulti
          ? Array.isArray(value) && value.length > 0
          : typeof value !== 'undefined' && value !== null;
      }, [isMulti, value]);
      const hasValueOrSearch = useMemo(() => {
        return hasValue || search !== '';
      }, [hasValue, search]);

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

      const [isOpen, handleIsOpen] = useTogglePositioner({
        refs: [selectRef, dropdownRef],
        initialOpen: isInitialOpen,
        onOpen: () => {
          if (cursor === null) {
            const firstValue = Array.isArray(value)
              ? value.length > 0
                ? value[0]
                : undefined
              : value;

            const keyedValue = get(keyedRef.current, getKeyedOption(firstValue));
            if (keyedValue && keyedValue.cursor) {
              setCursor(keyedValue.cursor);
            }
          }
        },
        onClose: () => {
          updateSearch('');
        }
      });

      // Handle focus
      const handleFocus = useCallback(
        ev => {
          if (!isInteractive) return;

          if (!isOpen) {
            handleIsOpen(true);
          }

          if (searchRef.current) {
            searchRef.current.focus(ev);
          }
        },
        [isOpen, handleIsOpen, isInteractive]
      );

      // Signaling to parent about select value
      useImperativeHandle(forwardedRef, () => ({
        focus: handleFocus,
        value
      }));

      // Keep prev value same as prop value
      useEffect(() => {
        if (isControlled.current && prevNextValue.current !== valueProp) {
          prevNextValue.current = valueProp;
        }
      }, [valueProp]);

      // Update value of select
      const updateValue = useCallback(
        (nextValue, resetCursor = true) => {
          if (prevNextValue.current === nextValue) return;

          if (!isControlled.current) setValueState(nextValue);
          if (resetCursor) {
            setCursor(null);
          }
          if (onChange) onChange(nextValue);
          prevNextValue.current = nextValue;
        },
        [onChange]
      );

      // Set search value onChange
      const handleSearch = useCallback(
        ev => {
          if (!isInteractive || (hasValue && !isMulti)) {
            return;
          }

          setCursor(null);
          updateSearch(ev.target.value);
        },
        [hasValue, isInteractive, isMulti, updateSearch]
      );

      // Handle clear
      const handleClear = useCallback(() => {
        if (!isInteractive) return;

        if (!isOpen) {
          handleIsOpen(true);
        }

        if (isMulti) {
          updateValue([]);
        } else {
          updateValue(undefined);
        }
      }, [handleIsOpen, isInteractive, isMulti, isOpen, updateValue]);

      const handleCheckAll = useCallback(() => {
        if (!isInteractive) return;

        if (isMulti) {
          const initialValue = Array.isArray(value) ? value : [];
          updateValue(
            [...initialValue, ...filterOptions.map(opt => opt[valueKey])].filter(onlyUnique)
          );

          updateSearch('');
        }
      }, [filterOptions, isInteractive, isMulti, updateSearch, updateValue, value, valueKey]);

      // Handle clear multi item
      const handleClearMultiItem = useCallback(
        valueToRemove => {
          if (Array.isArray(value)) {
            updateValue(value.filter(val => val !== valueToRemove));
            if (searchRef.current) {
              searchRef.current.focus();
            }
          }
        },
        [updateValue, value]
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
            updateValue(newOptions, false);
            updateSearch('');

            const keyedValue = get(keyedRef.current, getKeyedOption(nextValue));
            if (keyedValue && keyedValue.cursor) {
              setCursor(keyedValue.cursor);
            }

            if (searchRef.current) {
              searchRef.current.focus(ev);
            }
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

          if (isEnter && ev) {
            ev.preventDefault();
          }

          if (isArrowDown && cursor === null && filterOptions.length > 0) {
            if (!isOpen) {
              handleFocus(ev);
            }
            setCursor(0);
          } else {
            if (isArrowUp || isArrowDown || (isShift && isTab)) {
              ev.preventDefault();
            }
            if (isTab) {
              handleIsOpen(false);
            }
            if (isEscape) {
              handleIsOpen(false);
            }
            if (isBackspace && search === '' && hasValue && isClearable) {
              if (!isMulti) {
                handleClear();
              }
            }
            if (filterOptions.length > 0) {
              if (isEnter && cursor !== null) {
                const item = filterOptions[cursor][valueKey];
                handleClickItem(ev, item);
              }
              if (isArrowDown && cursor < filterOptions.length - 1) {
                setCursor(oldCursor => {
                  const newCursor = oldCursor + 1;
                  return newCursor > filterOptions.length - 1
                    ? filterOptions.length - 1
                    : newCursor;
                });
              } else if (isArrowUp && cursor > 0) {
                setCursor(oldCursor => {
                  const newCursor = oldCursor - 1;
                  return newCursor < 0 ? 0 : newCursor;
                });
              }
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
          isClearable,
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
          hasMultiControl,

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
          handleCheckAll,
          handleClearMultiItem,
          onSearch: handleSearch,
          handleClickItem,

          // Search ref
          searchRef
        }),
        [
          disabled,
          handleCheckAll,
          handleClear,
          handleClearMultiItem,
          handleClickItem,
          handleSearch,
          hasMultiControl,
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
            <Box w="full" ref={selectRef}>
              <SelectContainer
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
                    width={dropdownWidth || width}
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
            </Box>
          </SelectContext.Provider>
        </SelectMetaContext.Provider>
      );
    }
  )
);

Select.displayName = 'Select';

export { Select };
