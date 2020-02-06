/** @jsx jsx */
import { jsx } from '@emotion/core';
import { forwardRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import cn from 'classnames';

const Collapse = forwardRef(
  (
    {
      isOpen: isOpenProp,
      onAnimationStart,
      onAnimationEnd,
      duration = 0.2,
      children,
      className,
      ...rest
    },
    forwardedRef
  ) => {
    return (
      <AnimatePresence initial={false}>
        {isOpenProp && (
          <motion.div
            {...rest}
            ref={forwardedRef}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            style={{
              overflow: 'hidden'
            }}
            transition={{ duration, ease: 'linear' }}
            className={cn(['collapse', className])}
            onAnimationEnd={onAnimationEnd}
            onAnimationStart={onAnimationStart}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    );
  }
);

Collapse.displayName = 'Collapse';

export { Collapse };
