import { Fragment, createContext } from 'react';

export const BreadcrumbContext = createContext({
  itemComponent: 'div',
  wrapComponent: Fragment,
  allowedItemProps: [],
  allowedWrapProps: []
});
