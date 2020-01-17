import { useTheme } from 'emotion-theming';
import defaultTheme from '../theme';

/**
 * @function useUiTheme
 *
 * @return {defaultTheme}
 */
export const useUiTheme = () => {
  const preset = useTheme();
  const theme = preset && Object.keys(preset).length > 0 ? preset : defaultTheme;

  return theme;
};
