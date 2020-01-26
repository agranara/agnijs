import { useMemo, useRef, useEffect, useLayoutEffect, useState, useCallback } from 'react';
import { canUseDOM } from 'exenv';
import { assignRef } from './refs';

/**
 * Passes or assigns a value to multiple refs (typically a DOM node). Useful for
 * dealing with components that need an explicit ref for DOM calculations but
 * also forwards refs assigned by an app.
 */
export function useForkedRef(...refs) {
  return useMemo(() => {
    if (refs.every(ref => ref == null)) {
      return null;
    }
    return node => {
      refs.forEach(ref => {
        assignRef(ref, node);
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, refs);
}

/**
 * Returns the previous value of a reference after a component update.
 */
export function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
}

/**
 * Call an effect after a component update, skipping the initial mount.
 */
export function useUpdateEffect(effect, deps) {
  const mounted = useRef(false);
  useEffect(() => {
    if (mounted.current) {
      effect();
    } else {
      mounted.current = true;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

/**
 * Additional hook state with callback
 *
 * https://github.com/the-road-to-learn-react/use-state-with-callback/
 */
export function useStateWithCallback(initialState, callback) {
  const [state, setState] = useState(initialState);

  useEffect(() => callback(state), [state, callback]);

  return [state, setState];
}

export function useStateWithCallbackInstant(initialState, callback) {
  const [state, setState] = useState(initialState);

  useLayoutEffect(() => callback(state), [state, callback]);

  return [state, setState];
}

export function useRefState(initialValue) {
  const [state, setState] = useState(initialValue);
  const stateRef = useRef(state);
  useEffect(() => {
    stateRef.current = state;
  }, [state]);
  return [stateRef.current, setState];
}

export const useLongPress = (callback = () => {}, speed = 200) => {
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

/**
 * Enhanced effect hooks, when ssr (server side rendering)
 * or csr (client side rendering)
 */
export const useEnhancedEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;
