import { HTMLAttributes } from 'react';
import { BoxProps } from '../Box';

interface IBreadcrumbLinkProps extends HTMLAttributes<HTMLLinkElement> {
  as?: React.ElementType<any>;
  href?: string;
  to?: string | object;
}

interface IBreadcrumbItemProps {
  as?: React.ElementType<any>;
  index?: number;
}

export const Breadcrumb: React.FC<BoxProps>;

export const BreadcrumbItem: React.ForwardRefExoticComponent<IBreadcrumbItemProps>;

export const BreadcrumbLink: React.ForwardRefExoticComponent<IBreadcrumbLinkProps>;
