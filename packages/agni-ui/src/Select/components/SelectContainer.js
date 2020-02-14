import React, { forwardRef } from 'react';
import cn from 'classnames';
import { PseudoBox } from '../../PseudoBox';
import { useUiTheme } from '../../UiProvider/hooks/useUiTheme';
import { baseProps, boxedStyle } from '../../InputText/styles';
import { useSelectContext } from '../SelectContext';

const SelectContainer = forwardRef(({ className, children }, forwardedRef) => {
  const theme = useUiTheme();
  const {
    inputSize,
    isContainerFocus,
    onContainerFocus,
    disabled,
    readOnly,
    name
  } = useSelectContext();

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
    >
      {children}
    </PseudoBox>
  );
});

SelectContainer.displayName = 'SelectContainer';

export { SelectContainer };
