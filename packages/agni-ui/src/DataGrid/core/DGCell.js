import React, { forwardRef } from 'react';
import { get } from '../../_utils/get';

const isFunctionElement = element => typeof element === 'function';

const DGCell = forwardRef(
  (
    {
      cellComponent: Cell,
      indexRow,
      indexCell,
      record,
      column,
      style,
      className = 'datagrid__cell'
    },
    forwardedRef
  ) => {
    const baseProps = {
      role: 'cell',
      className,
      'aria-colindex': indexCell,
      style
    };

    let result = get(record, column.key, null) || null;
    if (column.renderCellValue) {
      result = column.renderCellValue({ record, column, indexCell, indexRow });
    }

    const isCellFn = isFunctionElement(Cell);
    if (isCellFn) {
      return (
        <Cell
          {...baseProps}
          indexRow={indexRow}
          indexCell={indexCell}
          record={record}
          column={column}
        >
          {result}
        </Cell>
      );
    }

    return (
      <Cell ref={forwardedRef} {...baseProps}>
        {result}
      </Cell>
    );
  }
);

DGCell.displayName = 'DGCell';

export { DGCell };
