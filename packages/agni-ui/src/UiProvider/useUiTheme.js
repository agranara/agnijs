import { useTheme } from 'emotion-theming';
import defaultTheme from '../theme';

/**
 * @function useUiTheme
 *
 * @return {defaultTheme}
 */
const useUiTheme = () => {
  const preset = useTheme();
  const theme = preset && Object.keys(preset).length > 0 ? preset : defaultTheme;

  return theme;
};

export { useUiTheme };
export default useUiTheme;
