import React from 'react';
import cn from 'classnames';

const DGFrozen = ({
  left,
  rowWidth,
  width,
  getFrozenLeftWidth,
  scrollbarSize,
  containerHeight
}) => {
  const hasHorizontalScroll = rowWidth > width;

  const frozenLeftWidth = getFrozenLeftWidth();

  return (
    <div
      className={cn(['datagrid__freeze-left', left > 0 && hasHorizontalScroll && 'enabled'])}
      style={{
        width: frozenLeftWidth,
        height: hasHorizontalScroll ? containerHeight - scrollbarSize : containerHeight
      }}
    />
  );
};

DGFrozen.displayName = 'DGFrozen';

export { DGFrozen };
