import React, { useRef, useEffect } from 'react';
import cn from 'classnames';
import { createPopper } from '@popperjs/core';
import { AnimatePresence, motion } from 'framer-motion';
import { Portal } from '../Portal';
import { Box } from '../Box';

const Positioner = ({
  children,
  innerRef,
  triggerRef,
  isOpen = false,
  placement = 'auto',
  initial = { opacity: 0, y: -5 },
  animate = { opacity: 1, y: 0 },
  exit = { opacity: 0, y: -5 },
  duration = 0.2,
  gap = 4,
  className,
  ...rest
}) => {
  const popperRef = useRef(null);

  useEffect(() => {
    if (popperRef.current !== null) {
      popperRef.current.destroy();
      popperRef.current = null;
    }
  }, []);

  useEffect(() => {
    const create = () => {
      popperRef.current = createPopper(triggerRef.current, innerRef.current, {
        modifiers: [{ name: 'offset', options: { offset: [0, gap] } }],
        placement
      });
    };

    const destroy = () => {
      if (popperRef.current !== null) {
        popperRef.current.destroy();
        popperRef.current = null;
      }
    };

    if (isOpen) {
      create();
    } else {
      destroy();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  return (
    <AnimatePresence initial={false}>
      <Portal>
        {isOpen && (
          <Box
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
            >
              {children}
            </motion.div>
          </Box>
        )}
      </Portal>
    </AnimatePresence>
  );
};

Positioner.displayName = 'Positioner';

export { Positioner };
