import { BoxProps } from '../Box';
import { VariantColor } from '../theme';

interface IMenuProps {
  isFixed?: boolean;
}

interface IMenuButtonProps {
  variant?: 'solid' | 'outline' | 'link' | 'unstyled' | 'ghost';
}

interface IMenuItemProps {
  variantColor?: VariantColor;
  isDisabled?: boolean;
}

type MenuProps = IMenuProps & BoxProps;
type MenuButtonProps = IMenuButtonProps & BoxProps;
type MenuItemProps = IMenuItemProps & BoxProps;

export const Menu: React.FC<MenuProps>;
export const MenuButton: React.FC<MenuButtonProps>;
export const MenuContainer: React.FC<BoxProps>;
export const MenuItem: React.FC<MenuItemProps>;
