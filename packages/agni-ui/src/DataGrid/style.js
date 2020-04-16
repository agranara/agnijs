import { css } from '@emotion/core';

// When using emotion core or any styling in CSS-in-JS
// Better encapsulate styling for data grid
// And put it inside container
// Rather than attach to each components
// So here it goes
const dataGridStyle = css`
  &.datagrid {
    position: relative;
    overflow: hidden;
  }

  & .datagrid__header {
    display: block;
    width: 100%;
    position: absolute;
    outline: 0;
    overflow: hidden;
  }

  & .datagrid__header-pane {
    position: relative;
    width: 100%;
    overflow: inherit;
    background-color: rgb(237, 242, 247);
  }

  & .datagrid__header-columns {
    position: relative;
    white-space: nowrap;
    overflow: hidden;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
  }

  & .datagrid__header-scrolls {
    position: relative;
    display: block;
  }

  & .datagrid__columngroup {
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
  }

  & .datagrid__columngroup__children {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
  }

  & .datagrid__column {
    user-select: none;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-items: center;
    justify-content: center;
    position: relative;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  & .datagrid__column-bg {
    background-image: linear-gradient(rgb(255, 255, 255), #f7fafc);
    box-shadow: rgba(226, 232, 240, 0.4) 0px 0px 0px 1px inset,
      rgba(226, 232, 240, 0.25) 0px -1px 1px 0px inset;
  }

  & .datagrid__column-sortable {
    position: absolute;
    right: 2px;
    color: #319795;
  }

  & .datagrid__column-value {
    padding-left: 8px;
    padding-right: 8px;
    text-align: center;
    text-transform: uppercase;
    font-size: 12px;
    font-weight: 600;
    cursor: pointer;
  }

  & .datagrid__initializer {
    padding: 8px;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  & .datagrid__freeze-left {
    position: absolute;
  }

  & .datagrid__freeze-left.enabled {
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
    z-index: 1;
  }

  & .datagrid__empty {
    position: absolute;
    padding: 8px;
    text-align: center;
  }

  & .datagrid__content {
    position: absolute;
    width: 100%;
    overflow: auto;
  }

  & .datagrid__content-table {
    position: relative;
    width: 100%;
    overflow: auto;
    outline: 0;
    will-change: transform;
  }

  & .datagrid__content-tbody {
    position: relative;
  }

  & .datagrid__row {
    background-color: white;
    position: absolute;
    width: 100%;
  }

  & .datagrid__row:hover {
    background-color: #edf2f7 !important;
  }

  & .datagrid__cell {
    position: absolute;
    display: inline-flex;
    align-items: center;
    background-color: inherit;
    white-space: nowrap;
    text-overflow: ellipsis;
    padding: 4px 8px;
    border-bottom-width: 1px;
    overflow: hidden;
  }
`;

const fullAbsoluteCss = {
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%'
};

export { dataGridStyle, fullAbsoluteCss };
