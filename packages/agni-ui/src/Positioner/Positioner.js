/** @jsx jsx */
import { jsx } from '@emotion/core';
import { useRef, useEffect, useCallback } from 'react';
import cn from 'classnames';
import isEqual from 'fast-deep-equal/es6/react';
import { createPopper } from '@popperjs/core';
import { AnimatePresence, motion } from 'framer-motion';
import { Portal } from '../Portal';
import { PseudoBox } from '../PseudoBox';
import { useComponentSize } from '../_hooks/useComponentSize';
import getPopperArrowStyle from './style';

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
  hasArrow,
  arrowBackground,
  ...rest
}) => {
  const timeoutRef = useRef(null);
  const popperRef = useRef(null);
  const [triggerSize] = useComponentSize(triggerRef);

  const prevSize = useRef(null);

  const prevOpen = useRef(isOpen);

  useEffect(() => {
    if (!isEqual(triggerSize, prevSize.current)) {
      prevSize.current = triggerSize;

      if (popperRef.current !== null) {
        popperRef.current.forceUpdate();
      }
    }
  }, [triggerSize]);

  // Will unmount
  useEffect(() => {
    return () => {
      if (popperRef.current !== null) {
        popperRef.current.destroy();
      }

      if (timeoutRef.current !== null) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const createPopperInstance = useCallback(() => {
    popperRef.current = createPopper(triggerRef.current, innerRef.current, {
      modifiers: [{ name: 'offset', options: { offset: [0, gap] } }],
      strategy: 'fixed',
      placement
    });

    // Monkey patch to trigger modifiers flip when animation started
    if (timeoutRef.current !== null) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      if (popperRef.current !== null) {
        popperRef.current.forceUpdate();
      }
    }, 10);
  }, [gap, innerRef, placement, triggerRef]);

  const destroyPopperInstance = useCallback(() => {
    if (popperRef.current !== null) {
      popperRef.current.destroy();
      popperRef.current = null;
    }
  }, []);

  const handleAnimationStart = useCallback(() => {
    // Prevent triggered more than once
    if (isOpen && prevOpen.current !== isOpen) {
      prevOpen.current = isOpen;
      createPopperInstance();
    }
  }, [createPopperInstance, isOpen]);

  const handleAnimationComplete = useCallback(() => {
    // Prevent triggered more than once
    if (!isOpen && prevOpen.current !== isOpen) {
      prevOpen.current = isOpen;
      destroyPopperInstance();
    }
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
              css={getPopperArrowStyle({ hasArrow, arrowBackground })}
            >
              <motion.div
                initial={initial}
                animate={animate}
                exit={exit}
                className="positioner__content"
                transition={{ ease: 'linear', duration }}
                onAnimationStart={handleAnimationStart}
              >
                {hasArrow && <PseudoBox data-popper-arrow="" role="presentation" bg="inherit" />}
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
