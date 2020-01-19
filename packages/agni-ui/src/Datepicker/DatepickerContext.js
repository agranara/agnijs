import { createContext, useContext } from 'react';

const DatepickerContext = createContext({});

const useDatepickerContext = () => useContext(DatepickerContext);

export { DatepickerContext, useDatepickerContext };
