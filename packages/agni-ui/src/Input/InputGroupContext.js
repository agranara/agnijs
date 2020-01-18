import { createContext } from 'react';

const InputGroupContext = createContext({
  groupSize: null,
  groupPadding: null,
  hasLeft: false,
  hasRight: false,
  setHasRight: () => {},
  setHasLeft: () => {}
});

export { InputGroupContext };
export default InputGroupContext;
