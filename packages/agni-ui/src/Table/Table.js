/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { PseudoBox } from '../Box';
import cn from 'classnames';
import { forwardRef } from 'react';

export const Table = forwardRef(
  (
    {
      children,
      className,
      css: cssProp,
      w = 'full',
      as: Comp = 'table',
      d = 'table',
      ...restProps
    },
    ref
  ) => {
    return (
      <PseudoBox
        {...restProps}
        ref={ref}
        as={Comp}
        d={d}
        w={w}
        css={css([
          {
            borderCollapse: 'collapse'
          },
          cssProp
        ])}
        className={cn(['table', className])}
        //
      >
        {children}
      </PseudoBox>
    );
  }
);
