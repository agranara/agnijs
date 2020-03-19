/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { memo } from 'react';
import { PseudoBox } from '../../PseudoBox';
import { useDatepickerContext } from '../DatepickerContext';
import { viewMode } from '../constants';

///////////////////////////////////////////////////////////////////

const selectorStyle = {
  color: 'white',
  bg: 'primary.500',
  _hover: {
    bg: 'primary.500'
  }
};

const cursorStyle = {
  color: 'black',
  bg: 'primary.200',
  _hover: {
    bg: 'primary.300'
  }
};

const baseStyle = {
  color: 'gray.300',
  bg: 'white'
};

const monthStyle = {
  color: 'black',
  bg: 'white',
  _hover: {
    bg: 'gray.200'
  }
};

const PickerBodyDay = ({ viewConfig, startRow, weekIndex, dayIndex, today }) => {
  const { value, focusValue, onChange } = useDatepickerContext();

  const day = viewConfig.startCellView(startRow, dayIndex);
  const formatDay = viewConfig.cellFullFormat(day);

  const isSameCell = viewConfig.sameCellSelector(day, value);
  const isSameView = viewConfig.sameViewSelector(day, focusValue);
  const isSameCursor = viewConfig.sameCursorSelector(day, focusValue);
  const isCurrentNoValue = viewConfig.sameCurrentSelector(day, today) && !value;

  const handleChange = () => {
    onChange(day);
  };

  return (
    <PseudoBox
      key={`view-body-${dayIndex}-${weekIndex}`}
      className="datepicker__body-pickday"
      d="table-cell"
      role="gridcell"
      h="30px"
      minW="30px"
      verticalAlign="middle"
      textAlign="center"
      lineHeight="1"
      outline="none"
      onClick={handleChange}
      tabIndex={-1}
      title={formatDay}
      aria-label={formatDay}
      aria-selected={isSameCell}
      cursor="pointer"
      userSelect="none"
    >
      <PseudoBox
        {...baseStyle}
        {...(isSameView && monthStyle)}
        {...(isSameCursor && cursorStyle)}
        {...((isSameCell || isCurrentNoValue) && selectorStyle)}
        rounded="md"
        py="7px"
        verticalAlign="middle"
      >
        {viewConfig.cellFormat(day)}
      </PseudoBox>
    </PseudoBox>
  );
};

PickerBodyDay.displayName = 'PickerBodyDay';

///////////////////////////////////////////////////////////////////

const PickerBody = memo(() => {
  const { focusValue, parser, mode } = useDatepickerContext();

  const viewConfig = viewMode[mode];

  const today = parser();

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
    <PseudoBox
      d="inline-table"
      className="datepicker__body"
      w="full"
      my={1}
      css={css({
        borderCollapse: 'collapse',
        borderSpacing: 0
      })}
      role="grid"
    >
      {viewConfig.headerFormat && (
        <PseudoBox d="table-header-group" className="datepicker__body-weeks" role="rowgroup">
          <PseudoBox d="table-row" className="datepicker__body-weekrow" role="row">
            {Array.from({ length: view.columns }, (_, i) => (
              <PseudoBox
                key={`view-head-${i}`}
                d="table-cell"
                className="datepicker__body-weekday"
                role="columnheader"
                lineHeight="1"
                w="30px"
                h="30px"
                textAlign="center"
                verticalAlign="middle"
                textTransform="none"
              >
                <PseudoBox
                  as="abbr"
                  outline="none"
                  fontWeight="semibold"
                  textDecoration="none !important"
                  title={viewConfig.headerFormatTitle(view.start, i)}
                >
                  {viewConfig.headerFormat(view.start, i)}
                </PseudoBox>
              </PseudoBox>
            ))}
          </PseudoBox>
        </PseudoBox>
      )}
      <PseudoBox d="table-row-group" className="datepicker__body-pick" role="rowgroup">
        {Array.from({ length: view.rows }, (_, y) => {
          const startRow = viewConfig.startRowView(view.start, y);
          return (
            <PseudoBox
              key={`view-body-${y}`}
              d="table-row"
              className="datepicker__body-pickweek"
              role="row"
            >
              {Array.from({ length: view.columns }, (_, x) => {
                return (
                  <PickerBodyDay
                    key={`view-body-${x}-${y}`}
                    dayIndex={x}
                    weekIndex={y}
                    startRow={startRow}
                    viewConfig={viewConfig}
                    today={today}
                  />
                );
              })}
            </PseudoBox>
          );
        })}
      </PseudoBox>
    </PseudoBox>
  );
});

PickerBody.displayName = 'PickerBody';

export { PickerBody };
