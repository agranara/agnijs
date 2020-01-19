import React, { useState, useRef } from 'react';
import Box from '../Box';
import Portal from '../Portal';
import { addEvent, removeEvent, useEnhancedEffect } from '../utils';

const defaultEvents = ['mousedown', 'touchstart'];

const useDropdown = ({ ref, initialOpen = false, isFixed }) => {
  const boxRef = useRef(null);
  const [pos, setPosition] = useState({});
  const [isOpen, setOpen] = useState(initialOpen);

  const reposition = () => {
    const scrollY = window.scrollY || 0;

    const rect = ref.current.getBoundingClientRect();
    const result = {};
    result.left = rect.left;
    result.width = rect.width || rect.right - rect.left;
    result.height = rect.height || rect.bottom - rect.top;
    result.top = isFixed ? rect.top + result.height : rect.top + scrollY + result.height;

    setPosition(result);
  };

  useEnhancedEffect(() => {
    const handler = event => {
      const { current: toggler } = ref;
      const { current: box } = boxRef;

      if (toggler && !toggler.contains(event.target) && box && !box.contains(event.target)) {
        setOpen(false);
      }
    };
    for (const eventName of defaultEvents) {
      addEvent(document, eventName, handler);
    }

    return () => {
      for (const eventName of defaultEvents) {
        removeEvent(document, eventName, handler);
      }
    };
  }, []);

  useEnhancedEffect(() => {
    reposition();
  }, [isOpen]);

  const toggle = () => setOpen(oldOpen => !oldOpen);

  const open = () => {
    if (!isOpen) {
      setOpen(true);
    }
  };

  const close = () => {
    if (isOpen) {
      setOpen(false);
    }
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
              p={2}
              mt={1}
              rounded="md"
              shadow="xs"
              zIndex="dropdown"
              borderWidth={1}
              bg="white"
              top={pos.top ? `${pos.top}px` : 0}
              left={pos.left ? `${pos.left}px` : 0}
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
    close
  };
};

export { useDropdown };
