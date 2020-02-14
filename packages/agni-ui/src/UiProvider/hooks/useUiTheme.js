import { useTheme } from 'emotion-theming';
import { theme as defaultTheme } from '../../theme';

const useUiTheme = () => {
  const preset = useTheme();
  const theme = preset && Object.keys(preset).length > 0 ? preset : defaultTheme;

  return theme;
};

export { useUiTheme };
