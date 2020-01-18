/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import cn from 'classnames';
import { Box } from '../Box';
import { useRowContext } from './RowContext';

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

export { Column };
export default Column;
