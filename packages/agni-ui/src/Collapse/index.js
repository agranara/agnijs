/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { forwardRef, useState } from 'react';
import AnimateHeight from 'react-animate-height';
import cn from 'classnames';
import { Box } from '../Box';

const Collapse = forwardRef(
  (
    {
      isOpen: isOpenProp,
      onAnimationStart,
      onAnimationEnd,
      animateOpacity = true,
      duration = 200,
      easing = 'ease',
      startingHeight = 0,
      endingHeight = 'auto',
      children,
      className,
      ...rest
    },
    forwardedRef
  ) => {
    const [isOpenState, setIsOpenState] = useState(() => isOpenProp || false);

    const handleAnimationStart = prop => {
      if (isOpenProp) {
        setIsOpenState(true);
      }
      if (onAnimationStart) {
        onAnimationStart(prop);
      }
    };

    const handleAnimationEnd = prop => {
      if (!isOpenProp) {
        setIsOpenState(false);
      }
      if (onAnimationEnd) {
        onAnimationEnd(prop);
      }
    };

    return (
      <AnimateHeight
        duration={duration}
        easing={easing}
        animateOpacity={animateOpacity}
        height={isOpenProp ? endingHeight : startingHeight}
        applyInlineTransitions={false}
        onAnimationStart={handleAnimationStart}
        onAnimationEnd={handleAnimationEnd}
        css={css({
          transition: 'height .2s ease,opacity .2s ease-in-out,transform .2s ease-in-out',
          '&.rah-animating--to-height-zero': {
            opacity: 0,
            transform: 'translateY(-0.625rem)'
          }
        })}
      >
        <Box {...rest} className={cn(['collapse-container', className])} ref={forwardedRef}>
          {isOpenProp || isOpenState ? children : null}
        </Box>
      </AnimateHeight>
    );
  }
);

Collapse.displayName = 'Collapse';

export { Collapse };
