import { createContext, useContext } from 'react';

const PaginationContext = createContext({});

const usePaginationContext = () => useContext(PaginationContext);

export { PaginationContext, usePaginationContext };
