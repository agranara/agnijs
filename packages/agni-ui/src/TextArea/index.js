/**
 * Thanks to https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/TextareaAutosize/TextareaAutosize.js
 */

import React, { forwardRef, useRef, useCallback, useState } from 'react';
import { useForkedRef } from '../_hooks/useForkedRef';
import { useEnhancedEffect } from '../_hooks/useEnhancedEffect';
import { debounce } from '../_utils/debounce';
import { InputText } from '../InputText';

function getStyleValue(computedStyle, property) {
  return parseInt(computedStyle[property], 10) || 0;
}

const TextArea = forwardRef((props, forwardedRef) => {
  const { minRows = 2, maxRows, rows, value, onChange, placeholder, style, ...restProps } = props;
  const { current: isControlled } = useRef(value != null);

  const inputRef = useRef();
  const forkedRef = useForkedRef(inputRef, forwardedRef);
  const shadowRef = useRef();

  const [state, setState] = useState({});

  const rowsMin = rows || minRows;

  const syncHeight = useCallback(() => {
    const input = inputRef.current;
    const computedStyle = window.getComputedStyle(input);

    const inputShallow = shadowRef.current;
    inputShallow.style.width = computedStyle.width;
    inputShallow.value = input.value || placeholder || 'x';

    const boxSizing = computedStyle['box-sizing'];
    const padding =
      getStyleValue(computedStyle, 'padding-bottom') + getStyleValue(computedStyle, 'padding-top');
    const border =
      getStyleValue(computedStyle, 'border-bottom-width') +
      getStyleValue(computedStyle, 'border-top-width');

    // The height of the inner content
    const innerHeight = inputShallow.scrollHeight - padding;

    // Measure height of a textarea with a single row
    inputShallow.value = 'x';
    const singleRowHeight = inputShallow.scrollHeight - padding;

    // The height of the outer content
    let outerHeight = innerHeight;

    if (rowsMin) {
      outerHeight = Math.max(Number(rowsMin) * singleRowHeight, outerHeight);
    }
    if (maxRows) {
      outerHeight = Math.min(Number(maxRows) * singleRowHeight, outerHeight);
    }
    outerHeight = Math.max(outerHeight, singleRowHeight);

    // Take the box sizing into account for applying this value as a style.
    const outerHeightStyle = outerHeight + (boxSizing === 'border-box' ? padding + border : 0);
    const overflow = Math.abs(outerHeight - innerHeight) <= 1;

    setState(prevState => {
      // Need a large enough different to update the height.
      // This prevents infinite rendering loop.
      if (
        (outerHeightStyle > 0 &&
          Math.abs((prevState.outerHeightStyle || 0) - outerHeightStyle) > 1) ||
        prevState.overflow !== overflow
      ) {
        return {
          overflow,
          outerHeightStyle
        };
      }

      return prevState;
    });
  }, [placeholder, rowsMin, maxRows]);

  React.useEffect(() => {
    const handleResize = debounce(() => {
      syncHeight();
    });

    window.addEventListener('resize', handleResize);
    return () => {
      handleResize.clear();
      window.removeEventListener('resize', handleResize);
    };
  }, [syncHeight]);

  useEnhancedEffect(() => {
    syncHeight();
  });

  const handleChange = event => {
    if (!isControlled) {
      syncHeight();
    }

    if (onChange) {
      onChange(event);
    }
  };

  return (
    <React.Fragment>
      <InputText
        {...restProps}
        as="textarea"
        className="textarea"
        ref={forkedRef}
        rows={rowsMin}
        py="7px"
        h="auto"
        minH="36px"
        lineHeight="short"
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        resize="none"
        transition="all 0.2s, height 0s"
        style={{
          height: state.outerHeightStyle,
          // Need a large enough different to allow scrolling.
          // This prevents infinite rendering loop.
          overflow: state.overflow ? 'hidden' : null,
          ...style
        }}
      />
      <InputText
        ref={shadowRef}
        as="textarea"
        aria-hidden
        readOnly
        tabIndex={-1}
        py="7px"
        h="auto"
        minH="36px"
        lineHeight="short"
        style={{
          // Visibility needed to hide the extra text area on iPads
          visibility: 'hidden',
          // Remove from the content flow
          position: 'absolute',
          // Ignore the scrollbar width
          overflow: 'hidden',
          height: 0,
          top: 0,
          left: 0,
          // Create a new layer, increase the isolation of the computed values
          transform: 'translateZ(0)'
        }}
      />
    </React.Fragment>
  );
});

TextArea.displayName = 'TextArea';

export { TextArea };
