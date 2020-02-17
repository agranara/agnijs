import React from 'react';
import { FiArrowUp, FiArrowDown } from 'react-icons/fi';
import { SORT_ASC, SORT_DESC } from '../constant';

const DGSortHandler = ({ sortOrder }) => {
  let sortIcon = null;
  if (sortOrder === SORT_ASC) {
    sortIcon = <FiArrowUp />;
  } else if (sortOrder === SORT_DESC) {
    sortIcon = <FiArrowDown />;
  }

  return <div className="datagrid__column-sortable">{sortIcon}</div>;
};

DGSortHandler.displayName = 'DGSortHandler';

export { DGSortHandler };
