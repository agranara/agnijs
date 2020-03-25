import React from 'react';
import cn from 'classnames';

import { PseudoBox } from '../../PseudoBox';

const DrawerBody = ({ children, className, ...rest }) => {
  return (
    <PseudoBox
      className={cn(['drawer__body', className])}
      flex="1 1 0%"
      bg="white"
      px={4}
      py={2}
      overflowY="auto"
      {...rest}
    >
      {children}
    </PseudoBox>
  );
};

DrawerBody.displayName = 'DrawerBody';

export { DrawerBody };
