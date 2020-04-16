import { BoxProps } from '../Box';

export const Card: React.ForwardRefExoticComponent<BoxProps>;
export const CardHead: React.ForwardRefExoticComponent<BoxProps>;
export const CardBody: React.ForwardRefExoticComponent<BoxProps>;
export const CardTitle: React.ForwardRefExoticComponent<BoxProps>;
export const CardSubtitle: React.ForwardRefExoticComponent<BoxProps>;
export const CardOption: React.ForwardRefExoticComponent<BoxProps>;

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

export const CardSimple: React.ForwardRefExoticComponent<ICardSimple>;
