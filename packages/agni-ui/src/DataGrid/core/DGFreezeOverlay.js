import React from 'react';
import cn from 'classnames';
import { useDGScrollContext } from '../context/DGScrollContext';

const DGFreezeOverlay = React.memo(
  ({ hasHorizontalScroll, freezeStyle, height, scrollbarSize }) => {
    const { left } = useDGScrollContext();

    return (
      <div
        className={cn(['datagrid__freeze-left', left > 0 && hasHorizontalScroll && 'enabled'])}
        style={{
          width: freezeStyle ? freezeStyle.width + freezeStyle.left - 1 : 0,
          height: hasHorizontalScroll ? height - scrollbarSize : height
        }}
      />
    );
  }
);

DGFreezeOverlay.displayName = 'DGFreezeOverlay';

export { DGFreezeOverlay };
