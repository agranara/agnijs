/** @jsx jsx */
import { jsx, css } from '@emotion/core';
// eslint-disable-next-line no-unused-vars
import React, { forwardRef } from 'react';
import cn from 'classnames';
import { useUiTheme } from '../UiProvider';

const useBaseCss = () => {
  const { sizes, fontSizes, lineHeights, colors } = useUiTheme();

  return css`
    font-size: ${fontSizes.sm};
    display: inline-flex;
    vertical-align: middle;
    outline: none;
    user-select: none;
    position: relative;
    line-height: ${lineHeights.shorter};
    transition: all 250ms;
    align-items: center;
    justify-content: center;

    & + & {
      &:before {
        content: '>';
        padding-left: ${sizes[2]};
        padding-right: ${sizes[2]};
      }
    }

    &:last-of-type {
      color: ${colors.primary[500]};
      font-weight: 500;
    }
  `;
};

export const BreadcrumbItem = forwardRef(
  ({ as: Item = 'div', children, className, ...restProps }, ref) => {
    const cssResult = useBaseCss();

    return (
      <Item ref={ref} className={cn(['breadcrumb-item', className])} {...restProps} css={cssResult}>
        {children}
      </Item>
    );
  }
);

export default BreadcrumbItem;
