import { createContext, useContext } from 'react';

const InputGroupContext = createContext({
  groupSize: null,
  groupPadding: null,
  hasLeft: false,
  hasRight: false,
  setHasRight: () => {},
  setHasLeft: () => {}
});

const useInputGroupContext = () => useContext(InputGroupContext);

export { InputGroupContext, useInputGroupContext };
