import { useEffect, useCallback, useState, useMemo, useRef } from 'react';
import { getFlatColumns as utilFlat, getArrayDepth } from '../util';

function useColumnManager(columns) {
  const flatColumns = useMemo(() => {
    return utilFlat(columns);
  }, [columns]);

  const columnDepth = useMemo(() => {
    return getArrayDepth(columns);
  }, [columns]);

  const calculateWidth = useCallback(() => {
    return Array.isArray(flatColumns)
      ? flatColumns.map((item, index) => {
          if (item) {
            if (item.width) {
              return item.width;
            }
            if (item.renderWidth) {
              return item.renderWidth({ indexCell: index });
            }
          }
          return undefined;
        })
      : [];
  }, [flatColumns]);

  const [columnWidths, setColumnWidths] = useState(() => {
    return calculateWidth(flatColumns);
  });

  const presetCellStyles = useRef({});

  useEffect(() => {
    presetCellStyles.current = {};
  }, [columns]);

  const getPresetCellStyle = useCallback((indexCell, indexRow, record, column) => {
    const key = `${indexRow}_${indexCell}`;
    if (!presetCellStyles.current[key]) {
      const cellStyleFn =
        column && column.renderCellStyle
          ? column.renderCellStyle({ indexCell, indexRow, record, column })
          : {};

      const cellStyleProp = column && column.cellStyle ? column.cellStyle : {};

      presetCellStyles.current[key] = {
        ...cellStyleProp,
        ...cellStyleFn
      };
    }
    return presetCellStyles.current[key];
  }, []);

  const getCellStyle = useCallback(
    (indexCell, indexRow, record, column) => {
      const presetStyle = getPresetCellStyle(indexCell, indexRow, record, column);

      const width = columnWidths[indexCell];

      return { ...presetStyle, width, maxWidth: width, minWidth: width };
    },
    [columnWidths, getPresetCellStyle]
  );

  const getCellHeaderStyle = useCallback(
    indexCell => {
      const width = columnWidths[indexCell] || 'auto';
      return { width, maxWidth: width, minWidth: width };
    },
    [columnWidths]
  );

  const setCellWidths = useCallback(newWidths => {
    setColumnWidths(newWidths);
  }, []);

  const setCellWidth = useCallback((indexCell, newWidth) => {
    setColumnWidths(old =>
      old.map((item, index) => {
        return index === indexCell ? newWidth : item;
      })
    );
  }, []);

  const getCellWidth = useCallback(
    indexCell => {
      return columnWidths[indexCell];
    },
    [columnWidths]
  );

  const getFrozenLeftWidth = useCallback(() => {
    return Array.isArray(flatColumns)
      ? flatColumns.reduce((prev, cur, index) => {
          const freezeWidth = cur.freezeLeft ? columnWidths[index] || 0 : 0;
          return prev + freezeWidth;
        }, 0)
      : 0;
  }, [columnWidths, flatColumns]);

  return {
    columns,
    columnDepth,
    flatColumns,
    columnWidths,
    getCellStyle,
    getCellHeaderStyle,
    getCellWidth,
    getFrozenLeftWidth,
    setCellWidths,
    setCellWidth
  };
}

export { useColumnManager };
