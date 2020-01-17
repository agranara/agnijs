/** @jsx jsx */
import { jsx, css } from '@emotion/core';
// eslint-disable-next-line no-unused-vars
import React from 'react';
import cn from 'classnames';
import { PseudoBox } from '../Box';

export const Td = ({
  children,
  className,
  isNormal,
  css: cssProp,
  as: Comp = 'td',
  d = 'table-cell',
  ...restProps
}) => {
  return (
    <PseudoBox
      as={Comp}
      d={d}
      fontWeight="normal"
      fontSize="md"
      whiteSpace={isNormal ? 'normal' : 'nowrap'}
      p={2}
      borderBottom="1px"
      borderBottomColor="gray.200"
      className={cn(['table-data', className])}
      css={css([cssProp])}
      verticalAlign="inherit"
      {...restProps}
    >
      {children}
    </PseudoBox>
  );
};
