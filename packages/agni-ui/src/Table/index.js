/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { forwardRef } from 'react';
import cn from 'classnames';
import PseudoBox from '../PseudoBox';
import { useUiTheme } from '../UiProvider';

const Table = forwardRef(
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

Table.displayName = 'Table';

///////////////////////////////////////////////////////////////////

const THead = forwardRef(
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

THead.displayName = 'THead';

///////////////////////////////////////////////////////////////////

const Th = ({ children, className, as: Comp = 'th', d = 'table-cell', ...restProps }) => {
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

Th.displayName = 'Th';

///////////////////////////////////////////////////////////////////

const ThSortContainer = ({ children, ...restProps }) => {
  return (
    <PseudoBox
      as="span"
      className="table--th"
      d="inline-flex"
      alignItems="center"
      verticalAlign="middle"
      pl={1}
      {...restProps}
      // role="button"
    >
      {children}
    </PseudoBox>
  );
};

ThSortContainer.displayName = 'ThSortContainer';

///////////////////////////////////////////////////////////////////

const ThSortIcon = ({ children, ...restProps }) => {
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
      className="table--sort"
      {...restProps}
    >
      {children}
    </PseudoBox>
  );
};

ThSortIcon.displayName = 'ThSortIcon';

///////////////////////////////////////////////////////////////////

const TBody = ({
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

TBody.displayName = 'TBody';

///////////////////////////////////////////////////////////////////

const Tr = forwardRef(
  (
    {
      children,
      className,
      isActive,
      isClickable,
      isHoverable = true,
      as: Comp = 'tr',
      d = 'table-row',
      css: cssProp,
      style,
      ...restProps
    },
    ref
  ) => {
    const theme = useUiTheme();
    const otherProps = { ...restProps };

    if (Comp === 'div' || Comp === 'tr') {
      if (otherProps.record) {
        delete otherProps.record;
      }
    }

    return (
      <Comp
        {...otherProps}
        ref={ref}
        className={cn(['table-row', className])}
        css={css([
          {
            display: d,
            backgroundColor: 'white',
            verticalAlign: 'inherit',
            borderColor: 'inherit',
            transition: 'background-color 200ms linear'
          },
          isHoverable && {
            '&:hover': {
              backgroundColor: theme.colors.gray[100]
            }
          },
          isClickable && {
            '&:focus': {
              backgroundColor: theme.colors.gray[200]
            },
            '&:active,&.active': {
              backgroundColor: theme.colors.gray[300]
            }
          },
          cssProp,
          style
        ])}
      >
        {children}
      </Comp>
    );

    // return (
    //   <PseudoBox
    //     as={Comp}
    //     d={d}
    //     bg="white"
    //     _hover={{
    //       bg: addOpacity(theme.colors.primary[500], 0.125)
    //     }}
    //     _focus={{
    //       bg: addOpacity(theme.colors.primary[500], 0.25)
    //     }}
    //     _active={{
    //       bg: addOpacity(theme.colors.primary[500], 0.25)
    //     }}
    //     transition="background-color 200ms linear"
    //     active={isActive || isClickable}
    //     cursor={isClickable ? 'pointer' : undefined}
    //     className={cn(['table-row', className])}
    //     verticalAlign="inherit"
    //     borderColor="inherit"
    //     {...restProps}
    //     //
    //   >
    //     {children}
    //   </PseudoBox>
    // );
  }
);

Tr.displayName = 'Tr';

///////////////////////////////////////////////////////////////////

const Td = ({
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

Td.displayName = 'Td';

///////////////////////////////////////////////////////////////////

const TFoot = ({ children, className, ...restProps }) => {
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

TFoot.displayName = 'TFoot';

export { Table, THead, TBody, TFoot, Tr, Th, ThSortContainer, ThSortIcon, Td };
