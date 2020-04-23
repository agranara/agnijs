/* eslint-disable no-restricted-syntax */
import { useRef, useEffect } from 'react';

const defaultEvents = ['mousedown', 'touchstart'];

const useOnClickOutside = (refs, onClickOutside, events = defaultEvents) => {
  const savedCallback = useRef(onClickOutside);
  useEffect(() => {
    savedCallback.current = onClickOutside;
  }, [onClickOutside]);

  useEffect(() => {
    const handler = ev => {
      const usedRefs = Array.isArray(refs) ? refs : [refs];
      const shouldApplyCallback = usedRefs.reduce((acc, ref) => {
        return ref.current && !ref.current.contains(ev.target) && acc;
      }, false);

      if (shouldApplyCallback) savedCallback.current(ev);
    };

    for (const eventName of events) {
      document.addEventListener(eventName, handler);
    }
    return () => {
      for (const eventName of events) {
        document.removeEventListener(eventName, handler);
      }
    };
  }, [events, refs]);
};

export { useOnClickOutside };
