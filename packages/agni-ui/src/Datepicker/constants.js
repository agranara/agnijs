import React from 'react';
import { PseudoBox } from '../PseudoBox';

export const months = [
  { label: 'Januari', value: 0 },
  { label: 'Februari', value: 1 },
  { label: 'Maret', value: 2 },
  { label: 'April', value: 3 },
  { label: 'Mei', value: 4 },
  { label: 'Juni', value: 5 },
  { label: 'Juli', value: 6 },
  { label: 'Agustus', value: 7 },
  { label: 'September', value: 8 },
  { label: 'Oktober', value: 9 },
  { label: 'November', value: 10 },
  { label: 'Desember', value: 11 }
];

export const years = Array.from({ length: 150 }, (_, i) => i + 1950);

// Date view configuration
const dateView = {
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
  cellFullFormat: val => val.format('dddd, DD MMM YYYY'),

  sameCellSelector: (val, compareVal) => val.isSame(compareVal, 'day'),
  sameViewSelector: (val, compareVal) => val.isSame(compareVal, 'month'),
  sameCursorSelector: (val, compareVal) => val.isSame(compareVal, 'day'),
  sameCurrentSelector: (val, compareVal) => val.isSame(compareVal, 'day')
};

// Year view configuration
const yearView = {
  startView: val => {
    const remain = val.get('year') % 10;
    return val.startOf('year').add(-1 * (remain + 1), 'year');
  },
  endView: val => {
    const remain = val.get('year') % 10;
    return val.startOf('year').add(12 - (remain + 1), 'year');
  },
  rowsView: () => 4,
  columnsView: () => 3,
  startRowView: (val, y) => val.add(y * 3, 'year'),
  startCellView: (val, x) => val.add(x, 'year'),
  cellFormat: val => val.format('YYYY'),
  cellFullFormat: val => val.format('YYYY'),

  sameCellSelector: (val, compareVal) => val.isSame(compareVal, 'year'),
  sameViewSelector: (val, compareVal) => {
    const remain = compareVal.get('year') % 10;
    const start = compareVal.get('year') - remain;
    const end = start + 9;
    return val.get('year') >= start && val.get('year') <= end;
  },
  sameCursorSelector: (val, compareVal) => val.isSame(compareVal, 'year'),
  sameCurrentSelector: (val, compareVal) => val.isSame(compareVal, 'year')
};

const monthView = {
  startView: val => val.startOf('year'),
  endView: val => val.endOf('year'),
  rowsView: () => 4,
  columnsView: () => 3,
  startRowView: (val, y) => val.add(y * 3, 'month'),
  startCellView: (val, x) => val.add(x, 'month'),
  cellFormat: val => val.format('MMM'),
  cellFullFormat: val => val.format('MMMM YYYY'),

  sameCellSelector: (val, compareVal) => val.isSame(compareVal, 'month'),
  sameViewSelector: (val, compareVal) => val.isSame(compareVal, 'year'),
  sameCursorSelector: (val, compareVal) => val.isSame(compareVal, 'month'),
  sameCurrentSelector: (val, compareVal) => val.isSame(compareVal, 'month')
};

const weekView = {
  startView: val => val.startOf('month').startOf('week'),
  endView: val =>
    val
      .endOf('month')
      .add(1, 'week')
      .startOf('week'),
  rowsView: (start, end) => end.diff(start, 'week'),
  // eslint-disable-next-line no-unused-vars
  columnsView: (start, end) => 1,

  startRowView: (val, y) => val.add(y, 'week'),
  startCellView: (val, x) => val.add(x, 'day'),

  headerFormat: val => {
    const headerWeeks = [];
    headerWeeks.push(
      <PseudoBox w={30} lineHeight="30px" key="header-week" mr={2} color="gray.300">
        #
      </PseudoBox>
    );
    for (let j = 0; j < 7; j++) {
      const weekName = val.add(j, 'day').format('dd');
      headerWeeks.push(
        <PseudoBox w={30} lineHeight="30px" key={j}>
          {weekName}
        </PseudoBox>
      );
    }
    return (
      <PseudoBox d="flex" flexDir="row" alignItems="center">
        {headerWeeks}
      </PseudoBox>
    );
  },
  headerFormatTitle: (val, i) => {
    return `${val.add(i, 'day').format('dddd')} - ${val.add(i + 6, 'day').format('dddd')}`;
  },
  cellFormat: val => {
    const headerWeeks = [];
    headerWeeks.push(
      <PseudoBox w={30} lineHeight="16px" key="header-week" mr={2} color="gray.300">
        {val.week()}
      </PseudoBox>
    );
    for (let j = 0; j < 7; j++) {
      const weekName = val.add(j, 'day').format('DD');
      headerWeeks.push(
        <PseudoBox w={30} lineHeight="16px" key={j}>
          {weekName}
        </PseudoBox>
      );
    }
    return (
      <PseudoBox d="flex" flexDir="row" alignItems="center">
        {headerWeeks}
      </PseudoBox>
    );
  },
  cellFullFormat: val => {
    return `Week ${val.week()}, ${val.format('dddd, DD MMM YYYY')} - ${val
      .add(6, 'day')
      .format('dddd, DD MMM YYYY')}`;
  },

  sameCellSelector: (val, compareVal) => val.isSame(compareVal, 'week'),
  sameViewSelector: (val, compareVal) => val.isSame(compareVal, 'month'),
  sameCursorSelector: (val, compareVal) => val.isSame(compareVal, 'day'),
  sameCurrentSelector: (val, compareVal) => val.isSame(compareVal, 'day')
};

export const viewMode = {
  date: dateView,
  year: yearView,
  month: monthView,
  week: weekView
};
