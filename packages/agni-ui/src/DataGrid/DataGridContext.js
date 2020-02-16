import { createContext, useContext } from 'react';

const DataGridContext = createContext({});
const useDataGridContext = () => useContext(DataGridContext);

export { DataGridContext, useDataGridContext };
