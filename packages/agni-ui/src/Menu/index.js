/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import React, { useState, useRef, createContext, useContext } from 'react';
import { get } from 'styled-system';
import { Box } from '../Box';
import { Button } from '../Button';
import { useDropdown } from '../_hooks/useDropdown';
import { useUiTheme } from '../UiProvider';
import { sizes } from '../Button/styles';

const MenuContext = createContext({
  isActive: false,
  setIsActive: () => {},
  open: () => {},
  close: () => {},
  toggle: () => {},
  Dropdown: ({ children }) => <React.Fragment>{children}</React.Fragment>,
  isOpen: false
});

const useMenuContext = () => useContext(MenuContext);

//////////////////////////////////////////////////////////////

const Menu = ({ children, isFixed, ...restProps }) => {
  const toggleRef = useRef();
  const menuRef = useRef();
  const [isActive, setIsActive] = useState();

  const { Dropdown, open, close, isOpen, toggle } = useDropdown({
    ref: toggleRef,
    isFixed
  });

  return (
    <MenuContext.Provider
      value={{
        isActive,
        ref: toggleRef,
        menuRef,
        setIsActive,
        open,
        close,
        Dropdown,
        isOpen,
        toggle
      }}
    >
      <Box className="menu" ref={menuRef} {...restProps}>
        {children}
      </Box>
    </MenuContext.Provider>
  );
};

Menu.displayName = 'Menu';

///////////////////////////////////////////////////////////

const MenuButton = ({ as: Comp = Button, children, onClick, variant = 'ghost', ...restProps }) => {
  const { ref, isOpen, toggle } = useMenuContext();

  const handleClick = () => {
    toggle();
  };

  return (
    <Comp ref={ref} isActive={isOpen} variant={variant} onClick={handleClick} {...restProps}>
      {children}
    </Comp>
  );
};

MenuButton.displayName = 'MenuButton';

///////////////////////////////////////////////////////////

const MenuContainer = ({ children, ...restProps }) => {
  const { Dropdown } = useMenuContext();

  return (
    <Dropdown px={0} py={1} {...restProps}>
      {children}
    </Dropdown>
  );
};
MenuContainer.displayName = 'MenuContainer';

///////////////////////////////////////////////////////////

const MenuItem = ({ children, onClick, ...restProps }) => {
  const { close } = useMenuContext();

  const handleClick = ev => {
    if (onClick) onClick(ev);
    close();
  };

  return (
    <MenuOption onClick={handleClick} {...restProps}>
      {children}
    </MenuOption>
  );
};

MenuItem.displayName = 'MenuItem';

///////////////////////////////////////////////////////////
const useMenuItemCss = ({ variantColor, size, isDisabled }) => {
  const { sizes: themeSizes, fontSizes, colors } = useUiTheme();

  const activeColor = get(colors, `${variantColor}.500`);
  const hoverColor = get(colors, `${variantColor}.50`);

  const baseCss = css`
    display: flex;
    appearance: none;
    align-items: center;
    justify-content: flex-start;
    transition: all 250ms;
    user-select: none;
    position: relative;
    white-space: nowrap;
    vertical-align: middle;
    line-height: 1;
    outline: none;
    text-align: left;

    color: ${activeColor};
    background-color: transparent;

    &:hover {
      background-color: ${hoverColor};
    }

    &:active,
    &.active {
      background-color: ${activeColor};
      color: white;
    }
  `;

  const { height, fontSize, px } = sizes[size];

  const sizeCss = css`
    height: ${themeSizes[height]};
    min-width: 9rem;
    font-size: ${fontSizes[fontSize]};
    padding-left: ${themeSizes[px]};
    padding-right: ${themeSizes[px]};
  `;

  const disabledCss = css`
    opacity: 40%;
    cursor: not-allowed;
    box-shadow: none;
  `;

  return css([baseCss, sizeCss, isDisabled && disabledCss]);
};

const MenuOption = ({
  as: Comp = 'button',
  children,
  size = 'md',
  isDisabled = false,
  variantColor = 'primary',
  ...restProps
}) => {
  const baseCss = useMenuItemCss({ isDisabled, size, variantColor });

  const additionalProps = {};
  if (Comp === 'button') {
    additionalProps.type = restProps.type || 'button';
  }

  return (
    <Comp {...restProps} {...additionalProps} css={baseCss}>
      {children}
    </Comp>
  );
};

MenuOption.displayName = 'MenuOption';
///////////////////////////////////////////////////////////

export { Menu, MenuButton, MenuItem, MenuContainer };
