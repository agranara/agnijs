/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import cn from 'classnames';
import { forwardRef } from 'react';
import { Box } from '../Box';
import { useUiTheme } from '../UiProvider';

const Breadcrumb = ({ children, ...restProps }) => {
  return (
    <Box className="breadcrumb" d="inline-flex" alignItems="center" {...restProps}>
      {children}
    </Box>
  );
};

Breadcrumb.dispayName = 'Breadcrumb';

/////////////////////////////////////////////////////////////////

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

const BreadcrumbItem = forwardRef(
  ({ as: Item = 'div', children, className, ...restProps }, forwardedRef) => {
    const cssResult = useBaseCss();

    return (
      <Item
        ref={forwardedRef}
        className={cn(['breadcrumb-item', className])}
        {...restProps}
        css={cssResult}
      >
        {children}
      </Item>
    );
  }
);

BreadcrumbItem.displayName = 'BreadcrumbItem';

export { BreadcrumbItem, Breadcrumb };
