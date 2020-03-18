import React, { useCallback } from 'react';
import cn from 'classnames';
import { PseudoBox } from '../../PseudoBox';
import { useSelectContext } from '../SelectContext';
import { useSelectMetaContext } from '../SelectMetaContext';

const SelectOptionItem = ({ index, style }) => {
  const { inputSize, isMulti, valueKey, labelKey, handleClickItem } = useSelectMetaContext();
  const { cursor, value, options } = useSelectContext();

  const option = options[index];
  const optionLabel = option[labelKey];
  const optionValue = option[valueKey];

  const isFocused = index === cursor;
  const isActive =
    isMulti && Array.isArray(value) ? value.indexOf(optionValue) > -1 : value === optionValue;

  const handleClick = useCallback(
    ev => {
      handleClickItem(ev, optionValue);
    },
    [handleClickItem, optionValue]
  );

  return (
    <PseudoBox
      className={cn(['select__option-item', isFocused && 'focused', isActive && 'active'])}
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
        bg: 'primary.100',
        fontWeight: 'semibold'
      }}
      _focus={{
        bg: 'primary.100'
      }}
      _hover={{
        bg: 'primary.50'
      }}
      title={optionLabel}
      role={optionValue ? 'option' : undefined}
      aria-selected={isActive ? 'true' : 'false'}
      transition="all 0.2s"
      tabIndex={0}
      outline="none"
    >
      <PseudoBox whiteSpace="nowrap" overflow="hidden" textOverflow="ellipsis">
        {optionLabel}
      </PseudoBox>
    </PseudoBox>
  );
};

SelectOptionItem.displayName = 'SelectOptionItem';

export { SelectOptionItem };
