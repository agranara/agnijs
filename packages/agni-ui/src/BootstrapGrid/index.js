/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import cn from 'classnames';
import { Children, isValidElement, cloneElement } from 'react';
import { Box } from '../Box';

/////////////////////////////////////////////////////////////////////

const Column = ({
  md,
  lg,
  xl,
  col,
  isDeck = false,
  totalColumn = 24,
  children,
  className,
  style
}) => {
  const calculateWidth = unit => {
    const w = (100 / totalColumn) * unit;
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
      alignItems={isDeck ? 'stretch' : undefined}
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

////////////////////////////////////////////////////////////////////////

const Row = ({ totalColumn = 24, className, style, children, isDeck = false, ...restProps }) => {
  const isZero = restProps.mx === 0;
  const marginX = restProps.mx || -2;

  return (
    <Box
      {...restProps}
      d={restProps.d || 'flex'}
      mx={isZero ? 0 : marginX}
      flexWrap="wrap"
      className={cn(['row', className])}
      style={style}
      // w={restProps.w || 'full'}
    >
      {Children.map(children, child => {
        if (!isValidElement(child)) return;

        if (child.type === Column) {
          return cloneElement(child, { isDeck, totalColumn });
        }
        return child;
      })}
    </Box>
  );
};

Row.displayName = 'Row';

export { Row, Column };
