import { BoxProps } from '../Box';

interface IHeadingProps {
  size?: '2xl' | 'xl' | 'lg' | 'md' | 'sm' | 'xs';
}

type HeadingProps = IHeadingProps & BoxProps;

export const Heading: React.ForwardRefExoticComponent<HeadingProps>;

export const Text: React.ForwardRefExoticComponent<BoxProps>;
