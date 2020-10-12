import React, { useCallback } from 'react';
import { Flex } from '../../Flex';
import { Text } from '../../Text';
import { InputNumber } from '../../InputNumber';
import { usePaginationContext } from '../PaginationContext';
import { isKeyboardKey } from '../../keyboard';

const PaginationGoTo = () => {
  const { page, totalPage, updatePage } = usePaginationContext();

  const handleBlur = useCallback(
    (_, newPage) => {
      updatePage(newPage);
    },
    [updatePage]
  );

  const handleKeyDown = useCallback(
    (ev, newPage) => {
      if (isKeyboardKey(ev, 'Enter')) {
        ev.preventDefault();
        updatePage(newPage);
      }
    },
    [updatePage]
  );

  return (
    <Flex className="pagination__goto">
      <Text mr={2}>Go to page</Text>
      <InputNumber
        value={page}
        isFullWidth={false}
        size="sm"
        minW="80px"
        w="80px"
        min={1}
        max={totalPage}
        onKeyDown={handleKeyDown}
        // onChange={handlePageChange}
        onBlur={handleBlur}
      />
    </Flex>
  );
};

PaginationGoTo.displayName = 'PaginationGoTo';

export { PaginationGoTo };
