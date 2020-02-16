/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { forwardRef } from 'react';

const DGContainer = forwardRef(({ children, height }, forwardedRef) => {
  return (
    <div
      ref={forwardedRef}
      className="datagrid"
      css={css([{ position: 'relative', overflow: 'hidden' }])}
      style={{ height }}
    >
      {children}
    </div>
  );
});

DGContainer.displayName = 'DGContainer';

export { DGContainer };
