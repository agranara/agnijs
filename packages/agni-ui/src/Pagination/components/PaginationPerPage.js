import React, { useCallback, useMemo } from 'react';
import { Box } from '../../Box';
import { Select } from '../../Select';
import { usePaginationContext } from '../PaginationContext';

const PaginationPerPage = () => {
  const {
    perPage,
    updatePerPage,
    totalData,
    perPageOptions,
    perPageOptionLabel,
    perPageOptionValue
  } = usePaginationContext();

  const options = useMemo(() => {
    if (perPageOptions) {
      return perPageOptions;
    }

    return [
      { label: '10', value: 10 },
      { label: '20', value: 20 },
      { label: '25', value: 25 },
      { label: '50', value: 50 },
      { label: '100', value: 100 },
      { label: 'Show all', value: totalData }
    ];
  }, [perPageOptions, totalData]);

  const handleChange = useCallback(
    val => {
      updatePerPage(val);
    },
    [updatePerPage]
  );

  return (
    <Box alignSelf="center" mr={2}>
      <Select
        options={options}
        value={perPage}
        size="sm"
        isClearable={false}
        isSearchable={false}
        placeholder="Max item shown"
        onChange={handleChange}
        labelKey={perPageOptionLabel}
        valueKey={perPageOptionValue}
      />
    </Box>
  );
};

PaginationPerPage.displayName = 'PaginationPerPage';

export { PaginationPerPage };
