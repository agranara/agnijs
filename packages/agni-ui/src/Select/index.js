import React, { useMemo, forwardRef, useRef, useState, useEffect, useCallback } from 'react';
import get from 'lodash.get';
import cn from 'classnames';
import { FixedSizeList } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import { FiX, FiChevronDown } from 'react-icons/fi';
import { Button } from '../Button';
import { mergeRefs } from '../utils';
import { useDropdown, useAutoId, useDebounceCallback } from '../hooks';
import { inputSizes } from '../inputSizes';
import { PseudoBox } from '../PseudoBox';
import { isKeyboardKey } from '../keyboard';
import { baseProps, boxedStyle } from '../InputText/styles';
import { useUiTheme } from '../UiProvider';
import { SelectContext, useSelectContext } from './SelectContext';

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
    const uid = useAutoId();
    const { current: isControlled } = useRef(typeof onChange === 'function');
    const ref = useRef();
    const searchRef = useRef();
    const pickerTimeout = useRef();
    const prevNextValue = useRef(null);
    const prevNextSearch = useRef('');

    useEffect(() => {
      const timeout = pickerTimeout.current;
      return () => {
        if (timeout) {
          clearTimeout(timeout);
        }
      };
    }, []);

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

    const memoizedKeyedOptions = useMemo(() => {
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

    const inputSize = useMemo(() => inputSizes[size], [size]);

    const isInteractive = !(readOnly || disabled);
    const value = isControlled ? valueProp : valueState;
    const hasValue = value && value !== null;
    const hasValueAndSearch = hasValue || search !== '';

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
          options: filterOptions,
          inputSize,
          valueKey,
          labelKey,
          value,
          handleClickItem,
          isMulti,
          isCreatable,
          cursor
        }}
      >
        <React.Fragment>
          <SelectContainer
            id={id}
            className={className}
            ref={mergeRefs(ref, forwardedRef)}
            onFocus={handleFocus}
            isFocus={isOpen && isInteractive}
            disabled={disabled}
            readOnly={readOnly}
            name={name}
            inputSize={inputSize}
          >
            <PseudoBox
              className="select--selection"
              d="flex"
              alignItems="flex-start"
              maxW="100%"
              flexWrap="wrap"
            >
              <SelectPlaceholder inputSize={inputSize} hasValue={hasValueAndSearch}>
                {placeholder}
              </SelectPlaceholder>
              <SelectValues
                uid={uid}
                value={value}
                valueKey={valueKey}
                labelKey={labelKey}
                inputSize={inputSize}
                keyedOptions={memoizedKeyedOptions}
              >
                {isInteractive && isSearchable && (
                  <SelectSearch
                    searchRef={searchRef}
                    search={search}
                    onChange={handleSearch}
                    onKeyDown={handleKeyDown}
                    inputSize={inputSize}
                  />
                )}
              </SelectValues>
            </PseudoBox>
            <PseudoBox
              d="flex"
              flexWrap="nowrap"
              pos="absolute"
              right={0}
              top={0}
              height={inputSize.height}
              alignItems="center"
              px={2}
              className="select--controls"
            >
              {hasValue && isInteractive && isClearable ? (
                <Button
                  className="select--icon-clear"
                  size="xs"
                  variantColor="danger"
                  p={1}
                  onClick={handleClear}
                >
                  <FiX />
                </Button>
              ) : (
                <PseudoBox
                  className="select--icon-dropdown"
                  pt="2px"
                  lineHeight="1"
                  h={5}
                  fontSize="1rem"
                >
                  <FiChevronDown />
                </PseudoBox>
              )}
            </PseudoBox>
          </SelectContainer>
          <AutoSizer disableHeight>
            {({ width }) => (
              <Dropdown role="list">
                <SelectPickerList
                  width={dropdownWidth ? dropdownWidth : width}
                  height={dropdownHeight}
                  cursor={cursor}
                  maxItemShown={maxItemShown}
                  inputSize={inputSize}
                  options={filterOptions}
                />
                {filterOptions.length === 0 && (
                  <SelectPickerItem
                    label={notFoundText}
                    style={{ justifyContent: 'center' }}
                    inputSize={inputSize}
                  />
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

////////////////////////////////////////////////////////////

const SelectContainer = forwardRef(
  (
    { children, className, inputSize, isFocus, onFocus, disabled, readOnly, name },
    forwardedRef
  ) => {
    const theme = useUiTheme();

    return (
      <PseudoBox
        ref={forwardedRef}
        {...baseProps}
        {...boxedStyle({ theme, focusBorderColor: 'primary.500', errorBorderColor: 'danger.500' })}
        d="block"
        pl={inputSize.px}
        pr="42px"
        rounded={inputSize.rounded}
        pos="relative"
        tabIndex={0}
        h="auto"
        minH={inputSize.height}
        className={cn(['select--container', className, isFocus && 'focused'])}
        onFocus={onFocus}
        aria-disabled={disabled}
        disabled={disabled}
        readOnly={readOnly}
        aria-readonly={readOnly}
        aria-expanded={isFocus}
        role="combobox"
        aria-autocomplete="list"
        aria-haspopup="listbox"
        name={name}
        width="100%"
      >
        {children}
      </PseudoBox>
    );
  }
);

////////////////////////////////////////////////////////////

const SelectPlaceholder = ({ children, inputSize, hasValue }) => {
  return (
    <PseudoBox
      lineHeight={`calc(${inputSize.lineHeight} - 2px)`}
      fontSize={inputSize.fontSize}
      pos="absolute"
      className="select--placeholder"
      userSelect="none"
      color="gray.500"
      d={hasValue ? 'none' : undefined}
    >
      {children}
    </PseudoBox>
  );
};

SelectPlaceholder.displayName = 'SelectPlaceholder';

////////////////////////////////////////////////////////////

const SelectValues = ({ uid, value, valueKey, labelKey, keyedOptions, inputSize, children }) => {
  return (
    <PseudoBox as="ul" listStyleType="none" className="select--values" maxW="100%">
      {Array.isArray(value) ? (
        value.map(val => (
          <SelectValueItem
            key={`${uid}-val-${keyedOptions[val][valueKey].toString()}`}
            inputSize={inputSize}
          >
            {val[labelKey]}
          </SelectValueItem>
        ))
      ) : value ? (
        <SelectValueItem
          key={`${uid}-val-${keyedOptions[value][valueKey].toString()}`}
          inputSize={inputSize}
        >
          {keyedOptions[value][labelKey]}
        </SelectValueItem>
      ) : null}
      <PseudoBox
        className="select--values-search"
        as="li"
        pos="static"
        float="left"
        w="auto"
        maxW="full"
        p={0}
      >
        {children}
      </PseudoBox>
    </PseudoBox>
  );
};

SelectValues.displayName = 'SelectValues';

////////////////////////////////////////////////////////////

const SelectValueItem = ({ children, inputSize }) => {
  return (
    <PseudoBox
      className="select--value-item"
      as="li"
      pos="relative"
      width="auto"
      float="left"
      mr={1}
      // lineHeight={`calc(${inputSize.lineHeight} - 2px)`}
      fontSize={inputSize.fontSize}
      userSelect="none"
      pt="6px"
    >
      {children}
    </PseudoBox>
  );
};

SelectValueItem.displayName = 'SelectValueItem';

////////////////////////////////////////////////////////////

const SelectSearch = ({ searchRef, search, onChange, inputSize, onKeyDown }) => {
  const theme = useUiTheme();

  return (
    <PseudoBox d="inline-block" w="full" maxW="full" pos="relative">
      <PseudoBox
        outline="none"
        ref={searchRef}
        as="input"
        w="12px"
        d="inline-block"
        maxW="full"
        h={`calc(${theme.sizes[inputSize.height]} - 2px)`}
        fontSize={inputSize.fontSize}
        className="select--search-input"
        onChange={onChange}
        value={search}
        spellCheck="false"
        autoCorrect="off"
        autoSave="off"
        autoComplete="off"
        onKeyDown={onKeyDown}
        bg="transparent"
      />
    </PseudoBox>
  );
};

SelectSearch.displayName = 'SelectSearch';

////////////////////////////////////////////////////////////

const SelectPickerWindowItem = ({ index, style }) => {
  const {
    inputSize,
    options,
    isMulti,
    cursor,
    value,
    valueKey,
    labelKey,
    handleClickItem
  } = useSelectContext();

  const option = options[index];
  const optionLabel = option[labelKey];
  const optionValue = option[valueKey];

  return (
    <SelectPickerItem
      style={style}
      label={optionLabel}
      onClick={handleClickItem}
      value={optionValue}
      isFocused={index === cursor}
      isActive={isMulti ? value.indexOf(optionValue) > -1 : value === optionValue}
      inputSize={inputSize}
    />
  );
};

SelectPickerWindowItem.displayName = 'SelectPickerWindowItem';

////////////////////////////////////////////////////////////

const SelectPickerItem = ({ label, style, value, isFocused, isActive, onClick, inputSize }) => {
  const handleClick = ev => {
    if (onClick) {
      onClick(ev, value);
    }
  };

  return (
    <PseudoBox
      className={cn(['select--list-item', isFocused && 'focused', isActive && 'active'])}
      style={style}
      px={inputSize.px}
      fontSize={inputSize.fontSize}
      lineHeight={inputSize.lineHeight}
      d="flex"
      alignItems="center"
      cursor="pointer"
      userSelect="none"
      onClick={handleClick}
      _active={{
        bg: 'primary.500',
        color: 'white'
      }}
      _focus={{
        bg: 'primary.100'
      }}
      _hover={{
        bg: 'primary.50'
      }}
      title={label}
      role={value ? 'option' : undefined}
      aria-selected={isActive ? 'true' : 'false'}
      transition="all 0.2s"
      tabIndex={0}
      outline="none"
    >
      <PseudoBox whiteSpace="nowrap" overflow="hidden" textOverflow="ellipsis">
        {label}
      </PseudoBox>
    </PseudoBox>
  );
};

SelectPickerItem.displayName = 'SelectPickerItem';

////////////////////////////////////////////////////////////

const SelectPickerList = ({ width, height, maxItemShown, cursor, inputSize, options }) => {
  const listRef = useRef();

  useEffect(() => {
    if (listRef) {
      listRef.current.scrollToItem(cursor);
    }
  }, [cursor]);

  const itemSize = inputSize.height * 4;
  const itemCount = options.length;

  const calculatedHeight =
    maxItemShown * itemSize > itemCount * itemSize ? itemCount * itemSize : maxItemShown * itemSize;

  const usedHeight = height ? height : calculatedHeight;

  return (
    <FixedSizeList
      ref={listRef}
      className="select--list"
      width={width}
      height={usedHeight}
      itemCount={itemCount}
      itemSize={itemSize}
      itemData={options}
    >
      {SelectPickerWindowItem}
    </FixedSizeList>
  );
};

SelectPickerList.displayName = 'SelectPickerList';

////////////////////////////////////////////////////////////

export { Select };
