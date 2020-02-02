import { BoxProps } from '../Box';
import { VariantColor } from '../theme';

interface IMenuProps {
  isFixed?: boolean;
  isRight?: boolean;
}

interface IMenuButtonProps {
  variant?: 'solid' | 'outline' | 'link' | 'unstyled' | 'ghost';
}

interface IMenuItemProps {
  variantColor?: VariantColor;
  isDisabled?: boolean;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  as?: React.ElementType<any>;
  [key: string]: any;
}

type MenuProps = IMenuProps & BoxProps;
type MenuButtonProps = IMenuButtonProps & BoxProps;
type MenuItemProps = IMenuItemProps;

export const Menu: React.FC<MenuProps>;
export const MenuButton: React.FC<MenuButtonProps>;
export const MenuContainer: React.FC<BoxProps>;
export const MenuItem: React.FC<MenuItemProps>;
