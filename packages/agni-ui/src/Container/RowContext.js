import { createContext, useContext } from 'react';

const RowContext = createContext({
  size: 24,
  isDeck: false
});

const useRowContext = () => useContext(RowContext);

export { RowContext, useRowContext };
export default RowContext;
