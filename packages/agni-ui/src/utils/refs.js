export const mergeRefs = (...refs) => ref => {
  refs.forEach(resolvableRef => {
    if (typeof resolvableRef === 'function') {
      resolvableRef(ref);
    } else if (resolvableRef != null) {
      resolvableRef.current = ref;
    }
  });
};
/**
 * Passes or assigns an arbitrary value to a ref function or object.
 */
export const assignRef = (ref, value) => {
  if (ref == null) return;
  if (typeof ref === 'function') {
    ref(value);
  } else {
    try {
      ref.current = value;
    } catch (error) {
      throw new Error(`Cannot assign value "${value}" to ref "${ref}"`);
    }
  }
};

export const setRef = (ref, value) => {
  if (typeof ref === 'function') {
    ref(value);
  } else if (ref) {
    ref.current = value;
  }
};
