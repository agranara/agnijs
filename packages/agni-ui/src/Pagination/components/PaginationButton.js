import React, { createElement } from 'react';
import { FiChevronsLeft, FiChevronLeft, FiChevronRight, FiChevronsRight } from 'react-icons/fi';
import { Flex } from '../../Flex';
import { Button } from '../../Button';
import { usePaginationContext } from '../PaginationContext';

const PaginateButton = ({ children, onClick, isActive, isDisabled, title }) => {
  return (
    <Button
      className="pagination__button-item"
      variant={isActive ? 'solid' : 'ghost'}
      variantColor={isActive ? 'primary' : 'gray'}
      isDisabled={isDisabled}
      _disabled={{
        opacity: isActive && isDisabled ? '1' : '0.4',
        cursor: 'not-allowed',
        boxShadow: 'none'
      }}
      css={{
        '&:first-of-type': {
          marginLeft: 0
        },
        '&:last-of-type': {
          marginRight: 0
        }
      }}
      rounded="md"
      size="sm"
      my={1}
      mx="2px"
      p={0}
      onClick={onClick}
      title={title}
    >
      {children}
    </Button>
  );
};

const isWithinRange = ({ page, index, totalPage, limit = 5 }) => {
  const halfLimit = Math.ceil(limit / 2);
  if (index > page - halfLimit && index < page + halfLimit) {
    return true;
  }

  if (index <= limit && page <= halfLimit) {
    return true;
  }

  if (index > totalPage - limit && page > totalPage - halfLimit) {
    return true;
  }

  return false;
};

const PaginationButton = () => {
  const { page, totalPage, updatePage } = usePaginationContext();

  const buttons = [];
  for (let index = 0; index < totalPage; index++) {
    if (isWithinRange({ page, index, totalPage })) {
      buttons.push(
        createElement(
          PaginateButton,
          {
            key: index,
            isActive: page === index + 1,
            isDisabled: page === index + 1,
            title: `Go to Page ${index + 1}`,
            onClick: () => updatePage(index + 1)
          },
          index + 1
        )
      );
    }
  }

  return (
    <Flex className="pagination__button" px={1}>
      <PaginateButton
        isDisabled={page === 1}
        onClick={() => updatePage(1)}
        title="Go to first page"
      >
        <FiChevronsLeft />
      </PaginateButton>
      <PaginateButton
        isDisabled={page === 1}
        onClick={() => updatePage(page - 1)}
        title="Go to previous page"
      >
        <FiChevronLeft />
      </PaginateButton>
      {buttons}
      <PaginateButton
        isDisabled={totalPage === page}
        onClick={() => updatePage(page + 1)}
        title="Go to next page"
      >
        <FiChevronRight />
      </PaginateButton>
      <PaginateButton
        isDisabled={totalPage === page}
        onClick={() => updatePage(totalPage)}
        title="Go to last page"
      >
        <FiChevronsRight />
      </PaginateButton>
    </Flex>
  );
};

PaginationButton.displayName = 'PaginationButton';

export { PaginationButton };
