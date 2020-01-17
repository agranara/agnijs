import React from 'react';
import cn from 'classnames';
import { PseudoBox } from '../Box';

export const Th = ({ children, className, as: Comp = 'th', d = 'table-cell', ...restProps }) => {
  return (
    <PseudoBox
      as={Comp}
      d={d}
      textAlign="-internal-center"
      fontWeight={600}
      fontSize="sm"
      textTransform="uppercase"
      borderBottom="1px"
      borderBottomColor="gray.200"
      cursor="pointer"
      verticalAlign="middle"
      bg="transparent"
      whiteSpace="nowrap"
      py={2}
      px={3}
      className={cn(['table-data-head', className])}
      {...restProps}
      //
    >
      {children}
    </PseudoBox>
  );
};

export const ThSortContainer = ({ children }) => {
  return (
    <PseudoBox
      as="span"
      className="gen-table--th"
      d="inline-flex"
      alignItems="center"
      verticalAlign="middle"
      pl={1}
      // role="button"
    >
      {children}
    </PseudoBox>
  );
};

export const ThSortIcon = ({ children }) => {
  return (
    <PseudoBox
      as="span"
      d="inline-flex"
      flexDirection="column"
      flexWrap="nowrap"
      fontWeight={600}
      pos="relative"
      color="primary.500"
      pl={1}
      className="gen-table--sort"
    >
      {children}
    </PseudoBox>
  );
};
