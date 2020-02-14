import React from 'react';
import { useUiTheme } from '../../UiProvider/hooks/useUiTheme';
import { PseudoBox } from '../../PseudoBox';
import { useSelectContext } from '../SelectContext';

const SelectSearch = ({ searchRef }) => {
  const theme = useUiTheme();
  const { search, onSearch, inputSize, onSearchKeyDown } = useSelectContext();

  return (
    <PseudoBox
      className="select__values-search"
      as="li"
      pos="static"
      float="left"
      w="auto"
      maxW="full"
      p={0}
    >
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
          className="select__search"
          onChange={onSearch}
          value={search}
          spellCheck="false"
          autoCorrect="off"
          autoSave="off"
          autoComplete="off"
          onKeyDown={onSearchKeyDown}
          bg="transparent"
        />
      </PseudoBox>
    </PseudoBox>
  );
};

SelectSearch.displayName = 'SelectSearch';

export { SelectSearch };
