import { BoxProps } from '../Box';

interface IAvatarGroupProps {
  size?: '2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
  borderColor?: string;
  max?: number;
  spacing?: number | string;
}

type AvatarGroupProps = IAvatarGroupProps & BoxProps;

export const AvatarGroup: React.FC<AvatarGroupProps>;
