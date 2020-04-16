import React, { forwardRef, memo } from 'react';
import cn from 'classnames';
import { PseudoBox } from '../../PseudoBox';
import { useUiTheme } from '../../UiProvider/hooks/useUiTheme';
import { baseProps, boxedStyle } from '../../InputText/styles';
import { useSelectMetaContext } from '../SelectMetaContext';
import { SelectPlaceholder } from './SelectPlaceholder';
import { SelectValueList } from './SelectValueList';
import { SelectSearch } from './SelectSearch';
import { SelectControl } from './SelectControl';

const SelectContainer = memo(
  forwardRef(({ className, onContainerFocus, onSearchKeyDown }, forwardedRef) => {
    const theme = useUiTheme();

    const {
      inputSize,
      isContainerFocus,
      disabled,
      isInteractive,
      readOnly,
      name,
      placeholder,
      hasValueOrSearch,
      searchRef
    } = useSelectMetaContext();

    return (
      <PseudoBox
        ref={forwardedRef}
        {...baseProps}
        {...boxedStyle({
          theme,
          focusBorderColor: 'primary.500',
          errorBorderColor: 'danger.500'
        })}
        {...(!isInteractive ? { _focus: {} } : {})}
        d="block"
        pl={inputSize.px}
        pr="42px"
        rounded={inputSize.rounded}
        pos="relative"
        tabIndex={0}
        h="auto"
        minH={inputSize.height}
        className={cn(['select__container', className, isContainerFocus && 'focused'])}
        onFocus={onContainerFocus}
        aria-disabled={disabled}
        disabled={disabled}
        readOnly={readOnly}
        aria-readonly={readOnly}
        aria-expanded={isContainerFocus}
        role="combobox"
        aria-autocomplete="list"
        aria-haspopup="listbox"
        name={name}
        width="100%"
        onKeyDown={onSearchKeyDown}
        overflow="hidden"
      >
        <PseudoBox
          className="select__selection"
          d="flex"
          alignItems="flex-start"
          maxW="100%"
          flexWrap="wrap"
        >
          <SelectPlaceholder
            placeholder={placeholder}
            hasValueOrSearch={hasValueOrSearch}
            inputSize={inputSize}
          />
          <SelectValueList>
            <SelectSearch ref={searchRef} />
          </SelectValueList>
        </PseudoBox>
        <SelectControl />
      </PseudoBox>
    );
  })
);

SelectContainer.displayName = 'SelectContainer';

export { SelectContainer };
