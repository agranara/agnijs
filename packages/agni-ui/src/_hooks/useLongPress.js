import { useState, useEffect, useCallback } from 'react';
import { canUseDOM } from 'exenv';

const useLongPress = (callback = () => {}, speed = 200) => {
  const [isPressed, setIsPressed] = useState(false);

  useEffect(() => {
    let timerId;
    if (isPressed) {
      timerId = setTimeout(callback, speed);
    } else {
      clearTimeout(timerId);
    }

    return () => {
      clearTimeout(timerId);
    };
  }, [isPressed, callback, speed]);

  const start = useCallback(() => {
    callback();
    setIsPressed(true);
  }, [callback]);

  const stop = useCallback(() => {
    setIsPressed(false);
  }, []);

  const clickEvent =
    canUseDOM && !!document.documentElement.ontouchstart ? 'onTouchStart' : 'onMouseDown';

  return {
    [clickEvent]: start,
    onMouseUp: stop,
    onMouseLeave: stop,
    onTouchEnd: stop
  };
};

export { useLongPress };
