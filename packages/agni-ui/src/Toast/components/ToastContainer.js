import React, { useState, useEffect, useCallback } from 'react';
import { PseudoBox } from '../../PseudoBox';
import { ToastPosition } from './ToastPosition';

const ToastContainer = ({ toast }) => {
  const [toasts, setToasts] = useState({
    'top-left': [],
    'top-center': [],
    'top-right': [],
    'bottom-left': [],
    'bottom-center': [],
    'bottom-right': []
  });

  useEffect(() => {
    if (toast) {
      const isTop = toast.placement.includes('top');

      setToasts(oldToasts => {
        return {
          ...oldToasts,
          [toast.placement]: isTop
            ? [toast, ...oldToasts[toast.placement]]
            : [...oldToasts[toast.placement], toast]
        };
      });
    }
  }, [toast]);

  const unregisterToast = useCallback((id, placement) => {
    setToasts(oldToasts => {
      return {
        ...oldToasts,
        [placement]: oldToasts[placement].filter(toastItem => toastItem.id !== id)
      };
    });
  }, []);

  const composeProps = placement => {
    const [vertical, horizontal] = placement.split('-');
    return {
      vertical,
      horizontal,
      placement,
      toasts: toasts[placement],
      unregisterToast
    };
  };

  return (
    <PseudoBox pos="absolute" width={0} height={0} top="-100%" left="-100%">
      <ToastPosition {...composeProps('top-left')} />
      <ToastPosition {...composeProps('top-center')} />
      <ToastPosition {...composeProps('top-right')} />
      <ToastPosition {...composeProps('bottom-left')} />
      <ToastPosition {...composeProps('bottom-center')} />
      <ToastPosition {...composeProps('bottom-right')} />
    </PseudoBox>
  );
};

ToastContainer.displayName = 'ToastContainer';

export { ToastContainer };