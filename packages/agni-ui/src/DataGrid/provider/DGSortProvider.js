import React, { useRef, useState, useCallback } from 'react';
import { DGSortContext } from '../context/DGSortContext';
import { SORT_ASC, SORT_DESC } from '../constant';

const DGSortProvider = ({
  children,
  sortKey: sortKeyProp,
  sortOrder: sortOrderProp,
  onSortChange
}) => {
  const isControlledRef = useRef(sortKeyProp && sortOrderProp);
  const [orderState, setOrder] = useState(() => {
    return {
      sortKey: sortKeyProp || undefined,
      sortOrder: sortOrderProp || undefined
    };
  });

  const handleSort = useCallback(
    (columnSortKey, currentSortKey, currentSortOrder) => {
      const res = [columnSortKey, undefined];
      if (columnSortKey === currentSortKey) {
        // When column was previous
        if (currentSortOrder === SORT_ASC) {
          res[1] = SORT_DESC;
        } else if (currentSortOrder === SORT_DESC) {
          res[0] = undefined;
          res[1] = undefined;
        } else {
          res[1] = SORT_ASC;
        }
      } else {
        res[1] = SORT_ASC;
      }

      if (onSortChange) onSortChange(res[0], res[1]);
      setOrder(oldState => ({ ...oldState, sortKey: res[0], sortOrder: res[1] }));
    },
    [onSortChange]
  );

  const sortKey = isControlledRef.current ? sortKeyProp : orderState.sortKey;
  const sortOrder = isControlledRef.current ? sortOrderProp : orderState.sortOrder;

  return (
    <DGSortContext.Provider value={{ sortKey, sortOrder, handleSort }}>
      {children}
    </DGSortContext.Provider>
  );
};

DGSortProvider.displayName = 'DGSortProvider';

export { DGSortProvider };
