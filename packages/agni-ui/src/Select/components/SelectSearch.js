import React, { memo, forwardRef } from 'react';
import { useUiTheme } from '../../UiProvider/hooks/useUiTheme';
import { PseudoBox } from '../../PseudoBox';
import { useSelectMetaContext } from '../SelectMetaContext';
import { useSelectContext } from '../SelectContext';

const SelectSearch = memo(
  forwardRef((_, ref) => {
    const theme = useUiTheme();

    const { onSearch, inputSize, isSearchable, isInteractive } = useSelectMetaContext();
    const { search } = useSelectContext();

    if (!isSearchable || !isInteractive) return null;

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
            ref={ref}
            as="input"
            w="12px"
            d="inline-block"
            maxW="full"
            h={`calc(${theme.sizes[inputSize.height]} - 2px)`}
            fontSize={inputSize.fontSize}
            className="select__search"
            value={search}
            spellCheck="false"
            autoCorrect="off"
            autoSave="off"
            autoComplete="off"
            onChange={onSearch}
            bg="transparent"
          />
        </PseudoBox>
      </PseudoBox>
    );
  })
);

SelectSearch.displayName = 'SelectSearch';

export { SelectSearch };
