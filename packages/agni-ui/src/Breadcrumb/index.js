/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import cn from 'classnames';
import { forwardRef, Children, isValidElement, cloneElement } from 'react';
import { FiChevronRight } from 'react-icons/fi';
import { Box } from '../Box';
import { PseudoBox } from '../PseudoBox';
import { useUiTheme } from '../UiProvider/hooks/useUiTheme';

/////////////////////////////////////////////////////////////////

const useBaseCss = () => {
  const { fontSizes, lineHeights } = useUiTheme();

  return `
    font-size: ${fontSizes.sm};
    display: inline-flex;
    outline: none;
    user-select: none;
    position: relative;
    line-height: ${lineHeights.shorter};
    transition: all 250ms;
    align-items: center;
    justify-content: center;
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
      <PseudoBox
        as={Item}
        ref={forwardedRef}
        d="flex"
        alignItems="center"
        {...restProps}
        _last={{ color: 'primary.500', fontWeight: '500' }}
      >
        {index > 0 && (
          <Box as="span" className="breadcrumb__divider" px={1} pt="2px">
            <FiChevronRight />
          </Box>
        )}
        {children}
      </PseudoBox>
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
      d="flex"
      alignItems="center"
      {...restProps}
    >
      {Children.map(children, (child, childIndex) => {
        if (!isValidElement(child)) return;

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
