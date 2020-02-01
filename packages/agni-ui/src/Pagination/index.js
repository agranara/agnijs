import React, { useState, useCallback, useRef, useEffect } from 'react';
import { Flex } from '../Flex';
import { sizes } from '../Button/styles';
import { PaginationContext } from './PaginationContext';
import { PaginationGoTo } from './components/PaginationGoTo';
import { PaginationStat } from './components/PaginationStat';
import { PaginationButton } from './components/PaginationButton';

const Pagination = ({
  page: pageProp,
  defaultPage = 1,
  perPage: perPageProp,
  defaultPerPage = 10,
  onPageChange,
  onPerPageChange,
  totalData = 0,
  isShowStat = true,
  isShowGoTo = true,
  isShowButton = true,
  size = 'md'
}) => {
  const { current: isControlledPage } = useRef(typeof onPageChange === 'function');
  const { current: isControlledPerPage } = useRef(typeof onPerPageChange === 'function');

  const prevPageRef = useRef();
  useEffect(() => {
    prevPageRef.current = pageProp;
  }, [pageProp]);

  const prevPerPageRef = useRef();
  useEffect(() => {
    prevPerPageRef.current = perPageProp;
  }, [perPageProp]);

  const [state, setState] = useState(() => {
    const page = pageProp || defaultPage;
    const perPage = perPageProp || defaultPerPage;

    return {
      page,
      perPage
    };
  });

  const updatePage = useCallback(
    newPage => {
      if (prevPageRef.current === newPage) return;

      setState(oldState => ({
        ...oldState,
        page: newPage
      }));

      if (onPageChange) onPageChange(newPage);

      prevPageRef.current = newPage;
    },
    [onPageChange]
  );

  const updatePerPage = useCallback(
    newPerPage => {
      if (prevPerPageRef.current === newPerPage) return;

      setState(oldState => {
        const newMaxRange = newPerPage * oldState.page;
        const shouldPageChange =
          newMaxRange > Math.ceil(totalData / oldState.perPage) * oldState.perPage;
        const newTotalPage = Math.ceil(totalData / newPerPage);
        return {
          ...oldState,
          page: shouldPageChange ? newTotalPage : oldState.page,
          perPage: newPerPage
        };
      });

      if (onPerPageChange) {
        onPerPageChange(newPerPage);
      }

      prevPerPageRef.current = newPerPage;
    },
    [onPerPageChange, totalData]
  );

  const page = isControlledPage ? pageProp : state.page;
  const perPage = isControlledPerPage ? perPageProp : state.perPage;
  const totalPage = Math.ceil(totalData / perPage);
  const itemSize = sizes[size];

  return (
    <PaginationContext.Provider
      value={{ page, perPage, updatePage, updatePerPage, totalData, totalPage, itemSize, size }}
    >
      <Flex className="pagination" py={1}>
        {isShowStat && <PaginationStat />}
        {isShowButton && <PaginationButton />}
        {isShowGoTo && <PaginationGoTo />}
      </Flex>
    </PaginationContext.Provider>
  );
};

Pagination.displayName = 'Pagination';

export { Pagination };
