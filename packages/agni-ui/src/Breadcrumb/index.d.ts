import { BoxProps } from '../Box';
import { HTMLAttributes } from 'react';

interface IBreadcrumbProps extends HTMLAttributes<HTMLLinkElement> {
  as?: React.ElementType<any>;
  href?: string;
  to?: string | object;
}

export const Breadcrumb: React.FC<BoxProps>;

export const BreadcrumbItem: React.FC<IBreadcrumbProps>;
