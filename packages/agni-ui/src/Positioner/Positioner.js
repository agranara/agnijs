import React, { useRef, useEffect, useCallback } from 'react';
import cn from 'classnames';
import isEqual from 'fast-deep-equal/es6/react';
import { createPopper } from '@popperjs/core';
import { AnimatePresence, motion } from 'framer-motion';
import { Portal } from '../Portal';
import { PseudoBox } from '../PseudoBox';
import { useComponentSize } from '../_hooks/useComponentSize';

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
  const [triggerSize] = useComponentSize(() => (triggerRef ? triggerRef.current : undefined));
  const prevSize = useRef(null);

  // Will unmount
  useEffect(() => {
    return () => {
      if (popperRef.current !== null) {
        popperRef.current.destroy();
        popperRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!isEqual(triggerSize, prevSize.current)) {
      prevSize.current = triggerSize;

      if (popperRef.current !== null) {
        popperRef.current.update();
      }
    }
  }, [triggerSize]);

  const createPopperInstance = useCallback(() => {
    popperRef.current = createPopper(triggerRef.current, innerRef.current, {
      modifiers: [{ name: 'offset', options: { offset: [0, gap] } }],
      strategy: 'fixed',
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
      <AnimatePresence initial={false} onExitComplete={handleAnimationComplete}>
        {isOpen && (
          <PseudoBox
            className="positioner__wrapper"
            pos="absolute"
            width={0}
            height={0}
            top="-100%"
            left="-100%"
          >
            <PseudoBox
              bg="white"
              rounded="md"
              shadow="sm"
              zIndex="popover"
              borderWidth={1}
              className={cn(['positioner', className])}
              py={1}
              {...rest}
              ref={innerRef}
            >
              <motion.div
                initial={initial}
                animate={animate}
                exit={exit}
                className="positioner__content"
                transition={{ ease: 'linear', duration }}
                onAnimationStart={handleAnimationStart}
              >
                {children}
              </motion.div>
            </PseudoBox>
          </PseudoBox>
        )}
      </AnimatePresence>
    </Portal>
  );
};

Positioner.displayName = 'Positioner';

export { Positioner };
