import React, { useCallback } from 'react';
import { Flex } from '../../Flex';
import { Text } from '../../Text';
import { InputNumber } from '../../InputNumber';
import { usePaginationContext } from '../PaginationContext';

const PaginationGoTo = () => {
  const { page, totalPage, updatePage } = usePaginationContext();

  const handleBlur = useCallback(
    (_, newPage) => {
      updatePage(newPage);
    },
    [updatePage]
  );

  return (
    <Flex className="pagination__goto">
      <Text mr={2}>Go to page</Text>
      <InputNumber
        defaultValue={page}
        size="sm"
        minW="80px"
        w="80px"
        min={1}
        max={totalPage}
        // onChange={handlePageChange}
        onBlur={handleBlur}
      />
    </Flex>
  );
};

PaginationGoTo.displayName = 'PaginationGoTo';

export { PaginationGoTo };
