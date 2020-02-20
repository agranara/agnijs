import { createContext, useContext } from 'react';

const ModalContext = createContext({});
const useModalContext = () => useContext(ModalContext);

export { ModalContext, useModalContext };
