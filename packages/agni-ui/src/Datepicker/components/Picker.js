import React from 'react';
import { Table, THead, Tr, TBody, Td, Th } from '../../Table';

import { Button } from '../../Button';
import { useDatepickerContext } from '../DatepickerContext';

const tableConfig = {
  monthly: {
    startView: val => val.startOf('month').startOf('week'),
    endView: val =>
      val
        .endOf('month')
        .add(1, 'week')
        .startOf('week'),
    rowsView: (start, end) => end.diff(start, 'week'),
    // eslint-disable-next-line no-unused-vars
    columnsView: (start, end) => 7,

    startRowView: (val, y) => val.add(y, 'week'),
    startCellView: (val, x) => val.add(x, 'day'),

    headerFormat: (val, i) => val.add(i, 'day').format('ddd'),
    cellFormat: val => val.format('D')
  }
};

const resetRowCss = {
  '&:hover': {
    backgroundColor: 'white'
  },
  '&:focus': {
    backgroundColor: 'white'
  },
  '&:active,&.active': {
    backgroundColor: 'white'
  }
};

const Picker = ({ as: Comp = 'button', viewConfig = tableConfig.monthly }) => {
  const { value, focusValue, onChange } = useDatepickerContext();

  const view = {
    start: viewConfig.startView(focusValue),
    end: viewConfig.endView(focusValue),
    rows: viewConfig.rowsView(viewConfig.startView(focusValue), viewConfig.endView(focusValue)),
    columns: viewConfig.columnsView(
      viewConfig.startView(focusValue),
      viewConfig.endView(focusValue)
    )
  };

  return (
    <Table w="unset" mx="auto">
      <THead>
        <Tr css={resetRowCss}>
          {Array.from({ length: view.columns }, (_, i) => (
            <Th
              key={`view-head-${i}`}
              fontSize="sm"
              lineHeight="1"
              px={0}
              py={2}
              w="36px"
              textAlign="center"
              verticalAlign="middle"
              textTransform="none"
              borderBottomWidth="1px"
            >
              {viewConfig.headerFormat(view.start, i)}
            </Th>
          ))}
        </Tr>
      </THead>
      <TBody>
        {Array.from({ length: view.rows }, (_, y) => {
          const startRow = viewConfig.startRowView(view.start, y);
          return (
            <Tr key={`view-body-${y}`} css={resetRowCss}>
              {Array.from({ length: view.columns }, (_, x) => {
                const day = viewConfig.startCellView(startRow, x);
                return (
                  <Td
                    key={`view-body-${x}-${y}`}
                    px="2px"
                    pb={y === view.rows - 1 ? '9px' : '2px'}
                    pt={y === 0 ? '9px' : '2px'}
                    h="32px"
                    w="32px"
                    textAlign="center"
                    verticalAlign="middle"
                    borderBottom="0"
                  >
                    <Button
                      as={Comp}
                      color={
                        day.isSame(value, 'day')
                          ? 'white'
                          : day.isSame(focusValue, 'month')
                          ? 'black'
                          : 'gray.300'
                      }
                      variant={day.isSame(value, 'day') ? 'solid' : 'ghost'}
                      variantColor={day.isSame(value, 'day') ? 'primary' : 'gray'}
                      w="32px"
                      h="32px"
                      p={0}
                      onClick={() => onChange(day)}
                    >
                      {viewConfig.cellFormat(day)}
                    </Button>
                  </Td>
                );
              })}
            </Tr>
          );
        })}
      </TBody>
    </Table>
  );
};

Picker.displayName = 'Picker';

export { Picker };
