import React, { useRef, useEffect, memo } from 'react';
import { FixedSizeList } from 'react-window';
import { SelectOptionItem } from './SelectOptionItem';

const SelectOptionList = memo(({ width, height, maxItemShown, cursor, inputSize, options }) => {
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
});

SelectOptionList.displayName = 'SelectOptionList';

export { SelectOptionList };
