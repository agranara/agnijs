import { ITheme } from '../theme';

interface IUiProviderProps {
  theme: ITheme;
}

export function useUiTheme(): ITheme;

export const UiProvider: React.FC<IUiProviderProps>;
