import { StyledComponent } from '@emotion/styled';
import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { ITheme } from '../theme';

type InnerVisuallyHiddenType = DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>;

export const VisuallyHidden: StyledComponent<
  InnerVisuallyHiddenType,
  { as: React.ElementType<any> },
  ITheme
>;
