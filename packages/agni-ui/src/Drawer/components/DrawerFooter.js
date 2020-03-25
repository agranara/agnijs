import React from 'react';
import cn from 'classnames';
import { PseudoBox } from '../../PseudoBox';

const DrawerFooter = ({ children, className, ...rest }) => {
  return (
    <PseudoBox
      className={cn(['drawer__footer', className])}
      bg="white"
      px={4}
      py={3}
      borderTopWidth={1}
      {...rest}
    >
      {children}
    </PseudoBox>
  );
};

DrawerFooter.displayName = 'DrawerFooter';

export { DrawerFooter };
