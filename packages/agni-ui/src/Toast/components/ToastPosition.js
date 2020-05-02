import React from 'react';
import { AnimatePresence } from 'framer-motion';
import { PseudoBox } from '../../PseudoBox';
import { Toast } from './Toast';

const verticalStyle = {
  top: {
    top: 6
  },
  bottom: {
    bottom: 6
  }
};

const horizontalStyle = {
  left: {
    left: 6
  },
  center: {
    left: '50%',
    transform: 'translateX(-50%)'
  },
  right: {
    right: 6
  }
};

const ToastPosition = ({ placement, vertical, horizontal, toasts, unregisterToast }) => {
  return (
    <PseudoBox
      className={`toast__placement-${placement}`}
      pos="fixed"
      d="flex"
      flexDir="column"
      zIndex="toast"
      {...verticalStyle[vertical]}
      {...horizontalStyle[horizontal]}
    >
      <AnimatePresence initial={false}>
        {toasts.map(toast => (
          <Toast key={toast.id} unregisterToast={unregisterToast} placement={placement} {...toast}>
            {toast.children}
          </Toast>
        ))}
      </AnimatePresence>
    </PseudoBox>
  );
};

ToastPosition.displayName = 'ToastPosition';

export { ToastPosition };
