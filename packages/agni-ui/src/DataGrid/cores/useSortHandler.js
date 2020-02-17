import { useEffect, useRef, useCallback, useState } from 'react';

export const SORT_ASC = 'asc';
export const SORT_DESC = 'desc';

export function useSortHandler({ sortKey: sortKeyProp, sortOrder: sortOrderProp, onSortChange }) {
  const { current: isControlled } = useRef(sortKeyProp && sortOrderProp);
  const [[sortKeyState, sortOrderState], setOrder] = useState(() => {
    return [sortOrderProp || undefined, sortOrderProp || undefined];
  });

  const savedSortChange = useRef();

  useEffect(() => {
    savedSortChange.current = onSortChange;
  }, [onSortChange]);

  const handleSort = useCallback((columnSortKey, currentSortKey, currentSortOrder) => {
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

    if (savedSortChange.current) savedSortChange.current(res[0], res[1]);
    setOrder(res);
  }, []);

  const sortKey = isControlled ? sortKeyProp : sortKeyState;
  const sortOrder = isControlled ? sortOrderProp : sortOrderState;

  return [sortKey, sortOrder, handleSort];
}
