import { BoxProps } from '../Box';

interface IAvatarProps {
  size?: '2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
  showBorder?: boolean;
  name?: string;
  src?: string;
  borderColor?: string;
}

type AvatarProps = IAvatarProps & BoxProps;

export const Avatar: React.FC<AvatarProps>;
