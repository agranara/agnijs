import { useRef, useEffect } from 'react';
import { addEvent, removeEvent } from '../utils';

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

      shouldApplyCallback && savedCallback.current(ev);
    };
    for (const eventName of events) {
      addEvent(document, eventName, handler);
    }
    return () => {
      for (const eventName of events) {
        removeEvent(document, eventName, handler);
      }
    };
  }, [events, refs]);
};

export { useOnClickOutside };
export default useOnClickOutside;
