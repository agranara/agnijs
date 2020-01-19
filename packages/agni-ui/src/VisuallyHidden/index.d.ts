import { StyledComponent } from '@emotion/styled';
import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { ITheme } from '../theme';

type InnerVisuallyHiddenType = DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>;

declare const VisuallyHidden: StyledComponent<
  InnerVisuallyHiddenType,
  { as: React.ElementType<any> },
  ITheme
>;

export default VisuallyHidden;
