/* eslint-disable no-use-before-define */
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
      for (let i = 0; i < refs.length; i += 1) {
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
    for (let i = 0; i < events.length; i += 1) {
      const eventName = events[i];
      document.addEventListener(eventName, handleClickOutside, false);
    }
  }, [events, handleClickOutside]);

  const unregisterOutsideClick = useCallback(() => {
    for (let i = 0; i < events.length; i += 1) {
      const eventName = events[i];
      document.removeEventListener(eventName, handleClickOutside, false);
    }
  }, [events, handleClickOutside]);

  const handleIsOpen = useCallback(
    newIsOpen => {
      if (prevOpen.current !== newIsOpen) {
        if (newIsOpen) {
          registerOutsideClick();

          if (onOpen) onOpen();
          setIsOpen(true);

          prevOpen.current = true;
        } else {
          unregisterOutsideClick();

          if (onClose) onClose();
          setIsOpen(false);

          prevOpen.current = false;
        }
      }
    },
    [onClose, onOpen, registerOutsideClick, unregisterOutsideClick]
  );

  return [isOpen, handleIsOpen];
}

useTogglePositioner.displayName = 'useTogglePositioner';

export { useTogglePositioner };
