interface INavLinkProps {
  isActive?: boolean;
  className?: string;
  as?: React.ElementType;
  [key: string]: any;
}

export const NavLink: React.ForwardRefExoticComponent<INavLinkProps>;
