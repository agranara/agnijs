/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import cn from 'classnames';
import { forwardRef, Children, isValidElement, cloneElement } from 'react';
import { FiChevronRight } from 'react-icons/fi';
import { Box } from '../Box';
import { useUiTheme } from '../UiProvider';

/////////////////////////////////////////////////////////////////

const useBaseCss = () => {
  const { fontSizes, lineHeights, colors } = useUiTheme();

  return `
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

    &:last-of-type {
      color: ${colors.primary[500]};
      font-weight: 500;
    }
  `;
};

const BreadcrumbLink = forwardRef(
  ({ as: Item = 'div', children, className, ...restProps }, forwardedRef) => {
    const cssResult = useBaseCss();

    return (
      <Item
        ref={forwardedRef}
        className={cn(['breadcrumb__link', className])}
        {...restProps}
        css={css([cssResult])}
      >
        {children}
      </Item>
    );
  }
);

BreadcrumbLink.displayName = 'BreadcrumbLink';

/////////////////////////////////////////////////////////////////

const BreadcrumbItem = forwardRef(
  ({ as: Item = 'div', children, index = 0, ...restProps }, forwardedRef) => {
    return (
      <Item ref={forwardedRef} {...restProps}>
        {index > 0 && (
          <Box as="span" className="breadcrumb__divider" lineHeight="shorter" px={1} pt="3px">
            <FiChevronRight />
          </Box>
        )}
        {children}
      </Item>
    );
  }
);

BreadcrumbItem.displayName = 'BreadcrumbItem';

/////////////////////////////////////////////////////////////////

const Breadcrumb = ({ children, ...restProps }) => {
  return (
    <Box
      as="nav"
      aria-label="breadcrumb"
      className="breadcrumb"
      d="inline-flex"
      alignItems="center"
      {...restProps}
    >
      {Children.map(children, (child, childIndex) => {
        if (!isValidElement(child)) return null;

        if (child.type === BreadcrumbItem) {
          return cloneElement(child, { index: childIndex });
        }

        return child;
      })}
    </Box>
  );
};

Breadcrumb.dispayName = 'Breadcrumb';

export { BreadcrumbLink, BreadcrumbItem, Breadcrumb };
