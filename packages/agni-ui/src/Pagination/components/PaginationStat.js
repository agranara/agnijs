import React from 'react';
import { Box } from '../../Box';
import { Text } from '../../Text';
import { usePaginationContext } from '../PaginationContext';

const PaginationStat = () => {
  const { page, perPage, totalPage, totalData, size } = usePaginationContext();

  let content = '';
  if (size === 'lg') {
    content = (
      <React.Fragment>
        Displaying {page > 0 ? (page - 1) * perPage + 1 : 0} {' - '}
        {page * perPage > totalData ? totalData : page * perPage}
        {' of '}
        {totalData} records.{' '}
      </React.Fragment>
    );
  } else if (size === 'md' || size === 'sm') {
    content = `${totalData} records. `;
  }

  return (
    <Box className="pagination__stat" mr="auto">
      <Text fontSize="md" lineHeight="1">
        {content}Page {page}/{totalPage}
      </Text>
    </Box>
  );
};

PaginationStat.displayName = 'PaginationStat';

export { PaginationStat };
