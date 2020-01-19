import { BoxProps } from '../Box';

export const Card: React.FC<BoxProps>;
export const CardHead: React.FC<BoxProps>;
export const CardBody: React.FC<BoxProps>;
export const CardTitle: React.FC<BoxProps>;
export const CardSubtitle: React.FC<BoxProps>;
export const CardOption: React.FC<BoxProps>;

export interface ICardSimple {
  title?: JSX.Element;
  subtitle?: JSX.Element;
  options?: JSX.Element;
  cardProps?: BoxProps;
  headProps?: BoxProps;
  titleProps?: BoxProps;
  subtitleProps?: BoxProps;
  optionsProps?: BoxProps;
  bodyProps?: BoxProps;
}

export const CardSimple: React.FC<ICardSimple>;
