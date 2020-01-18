import React from 'react';
import cn from 'classnames';
import { Box } from '../Box';
import { RowContext } from './RowContext';

const Row = ({ size = 24, className, style, children, isDeck, ...restProps }) => {
  const isZero = restProps.mx === 0;
  const marginX = restProps.mx || -2;

  return (
    <RowContext.Provider value={{ size, isDeck }}>
      <Box
        {...restProps}
        d={restProps.d || 'flex'}
        mx={isZero ? 0 : marginX}
        flexWrap="wrap"
        className={cn(['row', className])}
        style={style}
        // w={restProps.w || 'full'}
      >
        {children}
      </Box>
    </RowContext.Provider>
  );
};

export { Row };
export default Row;
