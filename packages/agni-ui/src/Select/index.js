/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { useMemo } from 'react';
import InputSelect from 'react-dropdown-select';
import cn from 'classnames';
import get from 'lodash.get';
import Box from '../Box';
import Button from '../Button';
import { FiX } from 'react-icons/fi';
import { useUiTheme } from '../UiProvider';
import { inputSizes } from '../Input/sizes';

const useSelectCss = ({ size = 'md' }) => {
  const theme = useUiTheme();
  const { px, height, lineHeight, rounded, fontSize } = inputSizes[size];

  const _focusBorderColor = theme.colors.teal[500];
  const hoverColor = theme.colors.gray[300];

  const result = `
    padding-left: ${theme.sizes[px]};
    padding-right: 0.375rem;
    min-height: ${theme.sizes[height]};
    font-size: ${theme.fontSizes[fontSize]};
    border-radius: ${theme.radii[rounded]};
    line-height: ${theme.lineHeights[lineHeight]};
    padding-top: 0;
    padding-bottom: 0;
    border-color: inherit;
    box-shadow: ${theme.shadows.input};

    &[disabled] {
      opacity: 1;
      pointer-events: none;
    }

    &:hover {
      border-color: ${hoverColor};
    }

    &:focus-within {
      border-color: ${_focusBorderColor};
      box-shadow: 0 0 0 1px ${_focusBorderColor};
    }

    & .react-dropdown-select-input {
      margin-left: 0;
      font-size: ${theme.fontSizes[fontSize]};
    }

    & .react-dropdown-select-content > span {
      padding-top: 0.25rem;
      padding-bottom: 0.25rem;
    }

    & .react-dropdown-select-dropdown-handle {
      margin: 0;
      margin-left: 4px;
    }

    & .react-dropdown-select-item {
      padding-left: ${theme.sizes[px]};
      padding-right: ${theme.sizes[px]};
      padding-top: 0.5rem;
      padding-bottom: 0.5rem;
    }

    & .react-dropdown-select-dropdown {
      border: 1px solid ${theme.colors.gray[100]};
      box-shadow: ${theme.shadows.sm};
      border-radius: ${theme.radii[rounded]};
      z-index: ${theme.zIndices.dropdown};
    }
  `;

  const disabledCss = `
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: ${theme.radii.md};
    background-color: ${theme.colors.gray[200]};
    opacity: 0.4;
  `;

  return {
    result,
    theme,
    disabledCss
  };
};

const Select = ({
  id,
  name,
  value,
  options,
  onChange,
  className,
  placeholder = 'Select one from option below',
  notFoundText = 'Option not found',
  labelKey = 'label',
  valueKey = 'value',
  isMulti = false,
  isClearable = true,
  isSearchable = true,
  disabled = false,
  dropdownHeight = '300px',
  size = 'md'
}) => {
  const { result, theme, disabledCss } = useSelectCss({ size });

  // Memoize options by setting value as key object
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

  // Format value to match 'react-dropdown-select' values usage
  const formatValue = val => {
    if (Array.isArray(val) && isMulti) {
      return val.map(v => memoizedKeyedOptions[v]);
    }
    if (val && !isMulti) {
      return [memoizedKeyedOptions[val]];
    }
    return [];
  };

  // Handle change to matched its type
  // multi returns array, if not return single object
  const handleChange = val => {
    if (isMulti) {
      const newValues = val.map(v => get(v, valueKey));
      if (onChange) onChange(newValues);
    } else {
      if (onChange) onChange(get(val[0], valueKey));
    }
  };

  // Additional handle keydown to clear values
  // when search is empty and backspace (keycode = 8) is pressed
  const handleKeyDown = ({ event, state, methods }) => {
    if (event.keyCode === 8 && !state.search && state.values.length > 0) {
      const lastItem = state.values[state.values.length - 1];
      methods.removeItem(event, lastItem, false);
    }
  };

  return (
    <Box pos="relative">
      <InputSelect
        id={id}
        name={name}
        values={formatValue(value)}
        options={options}
        multi={isMulti}
        placeholder={placeholder}
        onChange={handleChange}
        labelField={labelKey}
        valueField={valueKey}
        dropdownHeight={dropdownHeight}
        searchable={isSearchable}
        clearable={isClearable}
        className={cn(['rc-dropdown-select', className])}
        disabled={disabled}
        noDataLabel={notFoundText}
        closeOnSelect={false}
        dropdownGap={2}
        color={theme.colors.teal[500]}
        clearRenderer={({ state, methods }) => {
          if (state.values.length > 0) {
            return (
              <Button
                size="xs"
                variant="solid"
                variantColor="red"
                p={0}
                onClick={e => {
                  e.preventDefault();
                  methods.clearAll();
                }}
              >
                <FiX />
              </Button>
            );
          }
          return null;
        }}
        handleKeyDownFn={handleKeyDown}
        css={css([result])}
      />
      {disabled ? <div css={css(disabledCss)} /> : null}
    </Box>
  );
};

Select.displayName = 'Select';

export default Select;
