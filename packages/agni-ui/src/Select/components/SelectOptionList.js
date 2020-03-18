import React, { useRef, useEffect, memo, forwardRef } from 'react';
import { FixedSizeList } from 'react-window';
import { useForkedRef } from '../../_hooks/useForkedRef';
import { SelectOptionItem } from './SelectOptionItem';

const SelectOptionList = memo(
  forwardRef(({ width, height, maxItemShown, cursor, inputSize, options }, forwardedRef) => {
    const listRef = useRef();
    const prevCursor = useRef(null);

    const forkedRef = useForkedRef(listRef, forwardedRef);

    useEffect(() => {
      if (listRef && cursor !== prevCursor.current) {
        prevCursor.current = cursor;
        listRef.current.scrollToItem(cursor);
      }
    }, [cursor]);

    const itemSize = inputSize.height * 4;
    const itemCount = options.length;

    const calculatedHeight =
      maxItemShown * itemSize > itemCount * itemSize
        ? itemCount * itemSize
        : maxItemShown * itemSize;

    const usedHeight = height ? height : calculatedHeight;

    return (
      <FixedSizeList
        ref={forkedRef}
        className="select__option-list"
        width={width}
        height={usedHeight}
        itemCount={itemCount}
        itemSize={itemSize}
        itemData={options}
      >
        {SelectOptionItem}
      </FixedSizeList>
    );
  })
);

SelectOptionList.displayName = 'SelectOptionList';

export { SelectOptionList };
