import React from 'react';

const isFunctionElement = element => typeof element === 'function';

const DGRow = ({
  rowComponent: Row,
  indexRow,
  record,
  style,
  children,
  getRowDatumStyle,
  ...rest
}) => {
  const baseProps = {
    role: 'row',
    className: 'datagrid__row',
    'aria-rowindex': indexRow,
    style
  };

  if (getRowDatumStyle) {
    baseProps.style = { ...baseProps.style, ...getRowDatumStyle({ indexRow, record }) };
  }

  const isCellFn = isFunctionElement(Row);
  if (isCellFn) {
    return (
      <Row {...baseProps} {...rest} indexRow={indexRow} record={record}>
        {children}
      </Row>
    );
  }

  return (
    <Row {...baseProps} {...rest}>
      {children}
    </Row>
  );
};

DGRow.displayName = 'DGRow';

export { DGRow };
