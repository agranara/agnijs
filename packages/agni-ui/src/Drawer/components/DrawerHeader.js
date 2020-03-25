import React from 'react';
import cn from 'classnames';
import { PseudoBox } from '../../PseudoBox';

const DrawerHeader = ({ children, className, ...rest }) => {
  return (
    <PseudoBox
      as="h2"
      px={4}
      py={3}
      bg="white"
      fontWeight="semibold"
      lineHeight="tall"
      className={cn(['drawer__header', className])}
      fontSize="lg"
      borderBottomWidth={1}
      {...rest}
    >
      {children}
    </PseudoBox>
  );
};

DrawerHeader.displayName = 'DrawerHeader';

export { DrawerHeader };
