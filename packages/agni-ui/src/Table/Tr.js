/** @jsx jsx */
import { jsx, css } from '@emotion/core';
// eslint-disable-next-line no-unused-vars
import React, { forwardRef } from 'react';
import cn from 'classnames';
import { useUiTheme } from '../UiProvider';

export const Tr = forwardRef(
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
