import React, { useState, useCallback, useRef, useEffect } from 'react';
import { Flex } from '../Flex';
import { sizes } from '../Button/styles';
import { PaginationContext } from './PaginationContext';
import { PaginationGoTo } from './components/PaginationGoTo';
import { PaginationStat } from './components/PaginationStat';
import { PaginationButton } from './components/PaginationButton';
import { PaginationPerPage } from './components/PaginationPerPage';

const isValid = val => typeof val !== 'undefined' && val !== null;

const Pagination = ({
  page: pageProp,
  defaultPage = 1,
  perPage: perPageProp,
  defaultPerPage = 10,
  onPageChange,
  onPerPageChange,
  onPaginationChange,
  totalData = 0,
  isShowPerPage = true,
  isShowStat = true,
  isShowGoTo = true,
  isShowButton = true,
  size = 'md',
  perPageOptions,
  perPageOptionLabel,
  perPageOptionValue
}) => {
  const controlledPageRef = useRef(isValid(pageProp));
  const controlledPerPageRef = useRef(isValid(perPageProp));

  const { current: isControlledPage } = controlledPageRef;
  const { current: isControlledPerPage } = controlledPerPageRef;

  const [state, setState] = useState(() => {
    const page = pageProp || defaultPage;
    const perPage = perPageProp || defaultPerPage;

    return {
      page,
      perPage
    };
  });

  const prevPageRef = useRef(pageProp);
  useEffect(() => {
    if (prevPageRef.current !== pageProp) {
      prevPageRef.current = pageProp;
      setState(old => ({ ...old, page: pageProp }));
    }
  }, [pageProp]);

  const prevPerPageRef = useRef(perPageProp);
  useEffect(() => {
    if (prevPerPageRef.current !== perPageProp) {
      prevPerPageRef.current = perPageProp;
      setState(old => ({ ...old, perPage: perPageProp }));
    }
  }, [perPageProp]);

  const page = isControlledPage ? pageProp : state.page;
  const perPage = isControlledPerPage ? perPageProp : state.perPage;
  const totalPage = Math.ceil(totalData / perPage) || 1;
  const itemSize = sizes[size];

  const updatePage = useCallback(
    newPage => {
      if (prevPageRef.current === newPage) return;

      if (!controlledPageRef.current) {
        setState(oldState => ({
          ...oldState,
          page: newPage
        }));
      }

      if (onPageChange) onPageChange(newPage);
      if (onPaginationChange) onPaginationChange({ page: newPage, perPage });

      prevPageRef.current = newPage;
    },
    [onPageChange, onPaginationChange, perPage]
  );

  const updatePerPage = useCallback(
    newPerPage => {
      if (prevPerPageRef.current === newPerPage) return;

      const newMaxRange = newPerPage * page;
      const shouldPageChange = newMaxRange > Math.ceil(totalData / perPage) * perPage;
      const newTotalPage = Math.ceil(totalData / newPerPage);

      const newPage = shouldPageChange ? newTotalPage : page;
      if (!controlledPerPageRef.current) {
        setState(oldState => ({
          ...oldState,
          page: newPage,
          perPage: newPerPage
        }));
      }

      if (onPageChange && shouldPageChange) onPageChange(newPage);
      if (onPerPageChange) onPerPageChange(newPerPage);
      if (onPaginationChange) onPaginationChange({ page: newPage, perPage: newPerPage });

      prevPerPageRef.current = newPerPage;
    },
    [onPageChange, onPaginationChange, onPerPageChange, page, perPage, totalData]
  );

  return (
    <PaginationContext.Provider
      value={{
        page,
        perPage,
        perPageOptions,
        perPageOptionLabel,
        perPageOptionValue,
        updatePage,
        updatePerPage,
        totalData,
        totalPage,
        itemSize,
        size
      }}
    >
      <Flex className="pagination" py={1}>
        {isShowPerPage && <PaginationPerPage />}
        {isShowStat && <PaginationStat />}
        {isShowButton && <PaginationButton />}
        {isShowGoTo && <PaginationGoTo />}
      </Flex>
    </PaginationContext.Provider>
  );
};

Pagination.displayName = 'Pagination';

export { Pagination };
