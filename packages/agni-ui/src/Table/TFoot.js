import React from 'react';
import cn from 'classnames';
import { PseudoBox } from '../Box';

export const TFoot = ({ children, className, ...restProps }) => {
  return (
    <PseudoBox
      as="tfoot"
      className={cn(['table-footer', className])}
      {...restProps}
      //
    >
      {children}
    </PseudoBox>
  );
};
