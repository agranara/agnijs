/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import cn from 'classnames';
import { useUiTheme } from '../UiProvider';
import defaultTheme from '../theme';
import { forwardRef } from 'react';

const baseLink = (theme = defaultTheme) => css`
  display: inline-flex;
  appearance: none;
  align-items: center;
  justify-content: center;
  transition: all 250ms;
  user-select: none;
  position: relative;
  white-space: nowrap;
  vertical-align: middle;
  line-height: normal;
  outline: none;
  border-bottom: 3px solid transparent;
  padding: ${theme.sizes[2]} ${theme.sizes[2]};
  font-size: ${theme.fontSizes.sm};
  cursor: pointer;

  &:hover {
    border-color: ${theme.colors.primary[400]};
    color: ${theme.colors.primary[400]};
  }

  &:active,
  &.active {
    border-color: ${theme.colors.teal[500]};
    color: ${theme.colors.teal[500]};
  }

  & ~ & {
    margin-left: 4px;
  }
`;

const NavLink = forwardRef(
  ({ as: Comp = 'a', children, isActive, className, ...restProps }, ref) => {
    const theme = useUiTheme();

    return (
      <Comp
        ref={ref}
        {...restProps}
        className={cn(['nav-link', isActive && 'active', className])}
        css={css([baseLink(theme)])}
      >
        {children}
      </Comp>
    );
  }
);

NavLink.displayName = 'NavLink';

export { NavLink };
