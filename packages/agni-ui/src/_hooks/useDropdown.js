import React, { useState, useRef, useCallback } from 'react';
import { Box } from '../Box';
import { Portal } from '../Portal';
import { useEnhancedEffect } from '../_hooks/useEnhancedEffect';

const defaultEvents = ['mousedown', 'touchstart'];

const useDropdown = ({ ref, initialOpen, isFixed, onClose, onOpen }) => {
  const boxRef = useRef(null);
  const [pos, setPosition] = useState({});
  const [isOpen, setOpen] = useState(() => {
    return initialOpen || false;
  });
  const prevNextOpen = useRef(initialOpen || false);

  const reposition = useCallback(() => {
    const scrollY = window.scrollY || 0;

    const rect = ref.current.getBoundingClientRect();
    const result = {};
    result.left = rect.left;
    result.width = rect.width || rect.right - rect.left;
    result.height = rect.height || rect.bottom - rect.top;
    result.top = isFixed ? rect.top + result.height : rect.top + scrollY + result.height;

    setPosition(result);
  }, [isFixed, ref]);

  const isEventOutsideRefs = useCallback(
    event => {
      const { current: toggler } = ref;
      const { current: box } = boxRef;

      return toggler && !toggler.contains(event.target) && box && !box.contains(event.target);
    },
    [ref]
  );

  const updateOpen = (newOpen, event) => {
    if (prevNextOpen.current === newOpen) return;

    setOpen(newOpen);

    if (onClose && !newOpen) onClose(event);
    else if (onOpen && newOpen) onOpen(event);

    prevNextOpen.current = newOpen;
  };

  useEnhancedEffect(() => {
    const handler = event => {
      if (isEventOutsideRefs(event)) {
        updateOpen(false);
      }
    };
    for (const eventName of defaultEvents) {
      document.addEventListener(eventName, handler, false);
    }

    return () => {
      for (const eventName of defaultEvents) {
        document.removeEventListener(eventName, handler, false);
      }
    };
  }, []);

  useEnhancedEffect(() => {
    reposition();
  }, [isOpen]);

  const toggle = () => {
    const newOpen = !isOpen;
    updateOpen(newOpen);
  };

  const open = event => {
    updateOpen(true, event);
  };
  const close = event => {
    updateOpen(false, event);
  };

  return {
    Dropdown: ({ children, ...restProps }) => (
      <React.Fragment>
        {isOpen && (
          <Portal>
            <Box
              className="dropdown"
              ref={boxRef}
              minW={8}
              pos={isFixed ? 'fixed' : 'absolute'}
              py={1}
              mt={1}
              rounded="md"
              shadow="sm"
              zIndex="dropdown"
              borderWidth={1}
              bg="white"
              style={{
                top: pos.top,
                left: pos.left
              }}
              {...restProps}
            >
              {children}
            </Box>
          </Portal>
        )}
      </React.Fragment>
    ),
    isOpen,
    toggle,
    open,
    close,
    isEventOutsideRefs,
    reposition
  };
};

export { useDropdown };
