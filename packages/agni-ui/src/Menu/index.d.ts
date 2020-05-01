import { CSSObject } from '@emotion/core';
import { PseudoBoxProps } from '../PseudoBox';
import { PositionerProps } from '../Positioner';

interface IMenuProps {
  isActive?: boolean;
}

interface IMenuTriggerProps {
  css?: CSSObject;
  showCaret?: boolean;
  caretProps?: PseudoBoxProps;
}

interface IMenuItemProps {
  label?: string;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  isDivider?: boolean;
  isHeader?: boolean;
  className?: string;
}

type MenuProps = IMenuProps & PseudoBoxProps;
type MenuTriggerProps = IMenuTriggerProps & PseudoBoxProps;
type MenuListProps = PositionerProps;
type MenuItemProps = IMenuItemProps;

export const Menu: React.FC<MenuProps>;
export const MenuTrigger: React.FC<MenuTriggerProps>;
export const MenuList: React.FC<MenuListProps>;
export const MenuItem: React.FC<MenuItemProps>;
