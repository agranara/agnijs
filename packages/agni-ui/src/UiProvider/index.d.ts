import { ITheme } from '../theme';

interface IUiProviderProps {
  theme: ITheme;
}

declare function useUiTheme(): ITheme;

declare const UiProvider: React.FC<IUiProviderProps>;

export { UiProvider, useUiTheme };
