import { useRef, useState, useEffect, useCallback } from 'react';
import isEqual from 'fast-deep-equal/es6/react';
import { SORT_ASC, SORT_DESC } from '../constant';

function useSortManager(sortKeyProp, sortOrderProp, onSortChange) {
  const isControlledRef = useRef(sortKeyProp && sortOrderProp);
  const [orderState, setOrder] = useState(() => {
    return {
      sortKey: sortKeyProp,
      sortOrder: sortOrderProp
    };
  });

  const prevSort = useRef({ sortKey: sortKeyProp, sortOrder: sortOrderProp });

  useEffect(() => {
    const sort = { sortKey: sortKeyProp, sortOrder: sortOrderProp };
    if (!isEqual(prevSort.current, sort)) {
      prevSort.current = sort;
      setOrder(sort);
    }
  }, [sortKeyProp, sortOrderProp]);

  const handleSort = useCallback(
    (columnSortKey, currentSortKey, currentSortOrder) => {
      const res = [columnSortKey, undefined];
      if (columnSortKey === currentSortKey) {
        // When column was previous
        if (currentSortOrder === SORT_DESC) {
          res[1] = SORT_ASC;
        } else if (currentSortOrder === SORT_ASC) {
          res[0] = undefined;
          res[1] = undefined;
        } else {
          res[1] = SORT_DESC;
        }
      } else {
        res[1] = SORT_DESC;
      }

      if (onSortChange) onSortChange(res[0], res[1]);
      setOrder(oldState => ({ ...oldState, sortKey: res[0], sortOrder: res[1] }));
    },
    [onSortChange]
  );

  const sortKey = isControlledRef.current ? sortKeyProp : orderState.sortKey;
  const sortOrder = isControlledRef.current ? sortOrderProp : orderState.sortOrder;

  return {
    sortKey,
    sortOrder,
    handleSort
  };
}

export { useSortManager };
