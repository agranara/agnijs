import React from 'react';
import { useDGScrollContext } from '../context/DGScrollContext';

const DGFreezeOverlay = React.memo(({ hasHorizontalScroll, freezeStyle, height }) => {
  const { left } = useDGScrollContext();

  if (left > 0 && hasHorizontalScroll) {
    return (
      <div
        className="datagrid__freeze-left"
        style={{
          width: freezeStyle ? freezeStyle.width + freezeStyle.left - 1 : 0,
          height: height - 17
        }}
      />
    );
  }

  return null;
});

DGFreezeOverlay.displayName = 'DGFreezeOverlay';

export { DGFreezeOverlay };
