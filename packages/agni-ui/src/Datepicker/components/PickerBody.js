/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { PseudoBox } from '../../PseudoBox';
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

    headerFormat: (val, i) => val.add(i, 'day').format('dd'),
    headerFormatTitle: (val, i) => val.add(i, 'day').format('dddd'),
    cellFormat: val => val.format('D'),
    cellFullFormat: val => val.format('dddd, DD MMM YYYY')
  }
};

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
  bg: 'primary.300',
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

  const isSameDay = day.isSame(value, 'day');
  const isSameMonth = day.isSame(focusValue, 'month');
  const isCursorDay = day.isSame(focusValue, 'day');
  const isTodayNoValue = day.isSame(today, 'day') && !value;

  return (
    <PseudoBox
      key={`view-body-${dayIndex}-${weekIndex}`}
      className="datepicker__body-pickday"
      d="table-cell"
      role="gridcell"
      h="30px"
      w="30px"
      verticalAlign="middle"
      textAlign="center"
      lineHeight="1"
      outline="none"
      onClick={() => onChange(day)}
      tabIndex={-1}
      title={formatDay}
      aria-label={formatDay}
      aria-selected={isSameDay}
      cursor="pointer"
      userSelect="none"
    >
      <PseudoBox
        {...baseStyle}
        {...(isSameMonth && monthStyle)}
        {...(isCursorDay && cursorStyle)}
        {...((isSameDay || isTodayNoValue) && selectorStyle)}
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

const PickerBody = ({ viewConfig = tableConfig.monthly }) => {
  const { focusValue, parser } = useDatepickerContext();

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
      css={css({
        borderCollapse: 'collapse',
        borderSpacing: 0
      })}
      role="grid"
    >
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
};

PickerBody.displayName = 'PickerBody';

export { PickerBody };
