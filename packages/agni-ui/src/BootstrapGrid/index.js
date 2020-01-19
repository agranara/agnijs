/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import cn from 'classnames';
import Box from '../Box';
import { createContext, useContext } from 'react';

const RowContext = createContext({
  size: 24,
  isDeck: false
});

const useRowContext = () => useContext(RowContext);

////////////////////////////////////////////////////////////////////////

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

Row.displayName = 'Row';

/////////////////////////////////////////////////////////////////////

const Column = ({ md, lg, xl, col, children, className, style }) => {
  const { size, isDeck } = useRowContext();

  const calculateWidth = unit => {
    const w = (100 / size) * unit;
    return `${w}%`;
  };

  const isEmptySize = !md && !lg && !xl && !col;

  const w = {
    sm: col && calculateWidth(col),
    md: md && calculateWidth(md),
    lg: lg && calculateWidth(lg),
    xl: xl && calculateWidth(xl)
  };

  const colProps = {
    flexGrow: isEmptySize ? 1 : 0,
    flexShrink: isEmptySize ? 0 : undefined,
    flexBasis: isEmptySize ? 0 : w,
    maxW: isEmptySize ? '100%' : w,
    w: isEmptySize ? undefined : 'full'
  };

  return (
    <Box
      px={2}
      d={isDeck ? 'flex' : 'block'}
      {...colProps}
      flexDirection={isDeck ? 'column' : undefined}
      alignItems={isDeck ? 'stretch' : 'unset'}
      className={cn(['col', className])}
      transition="width 250ms ease"
      style={style}
      css={css([
        isDeck &&
          css`
            & .card {
              flex: 1 1 auto;
            }
            & .card-body {
              flex: 1 1 auto;
            }
          `
      ])}
    >
      {children}
    </Box>
  );
};

Column.displayName = 'Column';

export { Row, Column };
