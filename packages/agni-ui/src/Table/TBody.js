import React from 'react';
import { PseudoBox } from '../Box';
import cn from 'classnames';

export const TBody = ({
  children,
  className,
  as: Comp = 'tbody',
  d = 'table-row-group',
  ...restProps
}) => {
  return (
    <PseudoBox
      as={Comp}
      d={d}
      className={cn(['table-body', className])}
      verticalAlign="middle"
      borderColor="inherit"
      {...restProps}
      //
    >
      {children}
    </PseudoBox>
  );
};
