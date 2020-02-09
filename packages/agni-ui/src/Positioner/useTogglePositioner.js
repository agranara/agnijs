import { useRef, useEffect, useState, useCallback } from 'react';

const defaultEvents = ['mousedown', 'touchstart'];

function useTogglePositioner({
  refs = [],
  initialOpen = false,
  getIsOutside,
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

  const savedGetIsOutside = useRef(getIsOutside);
  useEffect(() => {
    savedGetIsOutside.current = getIsOutside;
  }, [getIsOutside]);

  const [isOpen, setIsOpen] = useState(() => initialOpen || false);

  useEffect(() => {
    return () => {
      unregisterOutsideClick();
    };
    // eslint-disable-next-line no-use-before-define
  }, [unregisterOutsideClick]);

  // Handle on Click outside
  const handleClickOutside = useCallback(
    ev => {
      for (let i = 0; i < refs.length; i++) {
        const ref = refs[i];

        if (ref.current && ref.current.contains(ev.target)) return;
      }

      if (savedGetIsOutside.current) {
        const isOutside = savedGetIsOutside.current(ev.target);
        if (isOutside) {
          handleIsOpen(false);
        }
      } else {
        handleIsOpen(false);
      }
    },
    // eslint-disable-next-line no-use-before-define
    [handleIsOpen, refs]
  );

  const registerOutsideClick = useCallback(() => {
    for (let i = 0; i < events.length; i++) {
      const eventName = events[i];
      document.addEventListener(eventName, handleClickOutside, false);
    }
  }, [events, handleClickOutside]);

  const unregisterOutsideClick = useCallback(() => {
    for (let i = 0; i < events.length; i++) {
      const eventName = events[i];
      document.removeEventListener(eventName, handleClickOutside, false);
    }
  }, [events, handleClickOutside]);

  const handleIsOpen = useCallback(
    newIsOpen => {
      if (prevOpen.current !== newIsOpen) {
        if (newIsOpen) {
          registerOutsideClick();
          setIsOpen(true);

          if (savedOnOpen.current) savedOnOpen.current();

          prevOpen.current = true;
        } else {
          unregisterOutsideClick();
          setIsOpen(false);

          if (savedOnClose.current) savedOnClose.current();

          prevOpen.current = false;
        }
      }
    },
    [registerOutsideClick, unregisterOutsideClick]
  );

  return [isOpen, handleIsOpen];
}

useTogglePositioner.displayName = 'useTogglePositioner';

export { useTogglePositioner };
