import React, { useRef, useEffect, useCallback } from 'react';
import cn from 'classnames';
import { createPopper } from '@popperjs/core';
import { AnimatePresence, motion } from 'framer-motion';
import { Portal } from '../Portal';
import { PseudoBox } from '../PseudoBox';

const Positioner = ({
  children,
  container,
  innerRef,
  triggerRef,
  isOpen = false,
  placement = 'auto',
  initial = { opacity: 0, y: -5 },
  animate = { opacity: 1, y: 0 },
  exit = { opacity: 0, y: -5 },
  duration = 0.15,
  gap = 4,
  className,
  onAnimationComplete,
  ...rest
}) => {
  const popperRef = useRef(null);

  // Did mount
  useEffect(() => {
    isOpen ? createPopperInstance() : destroyPopperInstance();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Will unmount
  useEffect(() => {
    return () => {
      if (popperRef.current !== null) {
        popperRef.current.destroy();
        popperRef.current = null;
      }
    };
  }, []);

  const createPopperInstance = useCallback(() => {
    popperRef.current = createPopper(triggerRef.current, innerRef.current, {
      modifiers: [{ name: 'offset', options: { offset: [0, gap] } }],
      placement
    });
  }, [gap, innerRef, placement, triggerRef]);

  const destroyPopperInstance = useCallback(() => {
    if (popperRef.current !== null) {
      popperRef.current.destroy();
      popperRef.current = null;
    }
  }, []);

  const handleAnimationStart = useCallback(() => {
    if (isOpen) createPopperInstance();
  }, [createPopperInstance, isOpen]);

  const handleAnimationComplete = useCallback(() => {
    if (!isOpen) destroyPopperInstance();
  }, [destroyPopperInstance, isOpen]);

  return (
    <Portal container={container}>
      <AnimatePresence initial={false}>
        {isOpen && (
          <PseudoBox
            {...rest}
            ref={innerRef}
            bg="white"
            rounded="md"
            shadow="sm"
            zIndex="dropdown"
            borderWidth={1}
            py={1}
          >
            <motion.div
              initial={initial}
              animate={animate}
              exit={exit}
              className={cn(['positioner', className])}
              transition={{ ease: 'linear', duration }}
              onAnimationStart={handleAnimationStart}
              onAnimationComplete={handleAnimationComplete}
            >
              {children}
            </motion.div>
          </PseudoBox>
        )}
      </AnimatePresence>
    </Portal>
  );
};

Positioner.displayName = 'Positioner';

export { Positioner };
