import styled from '@emotion/styled';
import css from '@styled-system/css';
import Box from '../Box';
import { transformAliasProps } from '../Box/config';

const ControlBox = styled(Box)(
  ({
    type = 'checkbox',
    _hover,
    _invalid,
    _disabled,
    _focus,
    _checked,
    _child = { opacity: 0 },
    _checkedAndChild = { opacity: 1 },
    _checkedAndDisabled,
    _checkedAndFocus,
    _checkedAndHover
  }) => {
    const cssInput = `input[type=${type}]`;

    const checkedAndDisabled = `${cssInput}:checked:disabled + &, ${cssInput}[aria-checked=mixed]:disabled + &`;
    const checkedAndHover = `${cssInput}:checked:hover:not(:disabled) + &, ${cssInput}[aria-checked=mixed]:hover:not(:disabled) + &`;
    const checkedAndFocus = `${cssInput}:checked:focus + &, ${cssInput}[aria-checked=mixed]:focus + &`;
    const disabled = `${cssInput}:disabled + &`;
    const focus = `${cssInput}:focus + &`;
    const hover = `${cssInput}:hover:not(:disabled):not(:checked) + &`;
    const checked = `${cssInput}:checked + &, ${cssInput}[aria-checked=mixed] + &`;
    const invalid = `${cssInput}[aria-invalid=true] + &`;

    return css({
      [focus]: transformAliasProps(_focus),
      [hover]: transformAliasProps(_hover),
      [disabled]: transformAliasProps(_disabled),
      [invalid]: transformAliasProps(_invalid),
      [checkedAndDisabled]: transformAliasProps(_checkedAndDisabled),
      [checkedAndFocus]: transformAliasProps(_checkedAndFocus),
      [checkedAndHover]: transformAliasProps(_checkedAndHover),
      '& > *': transformAliasProps(_child),
      [checked]: {
        ...transformAliasProps(_checked),
        '& > *': transformAliasProps(_checkedAndChild)
      }
    });
  }
);

ControlBox.defaultProps = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'all 120ms',
  'aria-hidden': 'true',
  flexShrink: 0
};

ControlBox.displayName = 'ControlBox';

export default ControlBox;
