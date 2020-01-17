import React, { forwardRef } from 'react';
import cn from 'classnames';
import { PseudoBox } from '../Box';

export const THead = forwardRef(
  (
    {
      children,
      className,
      as: Comp = 'thead',
      d = 'table-header-group',
      verticalAlign = 'middle',
      ...restProps
    },
    ref
  ) => {
    return (
      <PseudoBox
        as={Comp}
        d={d}
        verticalAlign={verticalAlign}
        className={cn(['table-head', className])}
        {...restProps}
        ref={ref}
      >
        {children}
      </PseudoBox>
    );
  }
);
