import React, { forwardRef, useRef, useState, Children, isValidElement, cloneElement } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { useForkedRef } from '../../_hooks/useForkedRef';
import { debounce } from '../../_utils/debounce';
import { PseudoBox } from '../../PseudoBox';
import { Button } from '../../Button';
import { TabButton } from './TabButton';
import { useEnhancedEffect } from '../../_hooks/useEnhancedEffect';

const TabButtons = forwardRef(({ children, ...rest }, forwardedRef) => {
  const ref = useRef();
  const wrapRef = useRef(null);
  const forkedRef = useForkedRef(ref, forwardedRef);
  const animationRef = useRef(null);

  const [hasScroll, setHasScroll] = useState(false);

  useEnhancedEffect(() => {
    const domRef = ref.current;
    if (domRef.scrollWidth > domRef.offsetWidth) {
      setHasScroll(true);
    }

    const stopAnimation = debounce(() => {
      cancelAnimationFrame(animationRef.current);

      animationRef.current = null;
    });

    const handleWheel = ev => {
      ev.preventDefault();
      const scrollLeft = ev.deltaY > 0 ? 100 : -100;
      if (animationRef.current === null) {
        animationRef.current = requestAnimationFrame(() => {
          ref.current.scrollBy({ left: scrollLeft, behavior: 'smooth' });
          stopAnimation();
        });
      }
    };

    const domWrapRef = wrapRef.current;

    domWrapRef.addEventListener('wheel', handleWheel, { passive: false });
    return () => {
      stopAnimation.clear();
      domWrapRef.removeEventListener('wheel', handleWheel, { passive: false });
    };
  }, []);

  const scrollToLeft = () => {
    ref.current.scrollBy({ left: -50, behavior: 'smooth' });
  };

  const scrollToRight = () => {
    ref.current.scrollBy({ left: 50, behavior: 'smooth' });
  };

  // TODO: handle keyboard binding

  return (
    <PseudoBox
      {...rest}
      ref={wrapRef}
      className="tabs__buttons"
      d="flex"
      flexDir="row"
      alignItems="center"
      flexWrap="nowrap"
      pos="relative"
      transition="all 0.2s"
      borderBottomWidth="1px"
      borderBottomColor="gray.200"
    >
      {hasScroll && (
        <Button variant="ghost" minW={8} w={8} shadow="none" bg="white" onClick={scrollToLeft}>
          <FiChevronLeft />
        </Button>
      )}
      <PseudoBox
        ref={forkedRef}
        className="tabs__list"
        role="tablist"
        transition="all 0.2s"
        overflow="hidden"
        d="flex"
        flexDir="row"
        alignItems="center"
        flexWrap="nowrap"
        userSelect="none"
      >
        {Children.map(children, (child, childIndex) => {
          if (!isValidElement(child)) return null;

          if (child.type === TabButton) {
            return cloneElement(child, { index: childIndex });
          }

          return child;
        })}
      </PseudoBox>
      {hasScroll && (
        <Button variant="ghost" minW={8} w={8} shadow="none" bg="white" onClick={scrollToRight}>
          <FiChevronRight />
        </Button>
      )}
    </PseudoBox>
  );
});

TabButtons.displayName = 'TabButtons';

export { TabButtons };
