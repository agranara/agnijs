import { createContext, useContext } from 'react';

export const DatepickerContext = createContext({});

export const useDatepickerContext = () => useContext(DatepickerContext);
