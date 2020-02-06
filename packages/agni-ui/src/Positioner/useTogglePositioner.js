import { useRef, useEffect, useState, useCallback } from 'react';

const defaultEvents = ['mousedown', 'touchstart'];

function useTogglePositioner({
  refs = [],
  initialOpen = false,
  onOpen,
  onClose,
  events = defaultEvents
}) {
  const prevOpen = useRef(initialOpen || false);

  const savedOnOpen = useRef(onOpen);
  useEffect(() => {
    savedOnOpen.current = onOpen;
  }, [onOpen]);

  const savedOnClose = useRef(onClose);
  useEffect(() => {
    savedOnClose.current = onClose;
  }, [onClose]);

  const [isOpen, setIsOpen] = useState(() => initialOpen || false);

  useEffect(() => {
    return () => {
      for (let i = 0; i < events.length; i++) {
        const eventName = events[i];
        document.removeEventListener(eventName, handleClickOutside);
      }
    };
    // eslint-disable-next-line no-use-before-define
  }, [events, handleClickOutside]);

  // Handle on Click outside
  const handleClickOutside = useCallback(
    ev => {
      for (let i = 0; i < refs.length; i++) {
        const ref = refs[i];

        if (ref.current && ref.current.contains(ev.target)) return;
      }

      handleIsOpen(false);
    },
    // eslint-disable-next-line no-use-before-define
    [handleIsOpen, refs]
  );

  const handleIsOpen = useCallback(
    newIsOpen => {
      if (prevOpen.current !== newIsOpen) {
        if (newIsOpen) {
          document.addEventListener('mousedown', handleClickOutside);
          document.addEventListener('touchstart', handleClickOutside);
          setIsOpen(true);

          if (savedOnOpen.current) savedOnOpen.current();

          prevOpen.current = true;
        } else {
          document.removeEventListener('mousedown', handleClickOutside);
          document.removeEventListener('touchstart', handleClickOutside);
          setIsOpen(false);

          if (savedOnClose.current) savedOnClose.current();

          prevOpen.current = false;
        }
      }
    },
    [handleClickOutside]
  );

  return [isOpen, handleIsOpen];
}

useTogglePositioner.displayName = 'useTogglePositioner';

export { useTogglePositioner };
