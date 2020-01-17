import { createContext } from 'react';

export const InputGroupContext = createContext({
  groupSize: null,
  groupPadding: null,
  hasLeft: false,
  hasRight: false,
  setHasRight: () => {},
  setHasLeft: () => {}
});
