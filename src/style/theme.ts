import { createMuiTheme } from '@material-ui/core/styles';

const UiTheme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
  palette: {
    primary: {
      main: '#ff2700',
      light: '#ff6737',
      dark: '#c30000'
    },
    secondary: {
      main: '#f9eb1f',
      light: '#ffff60',
      dark: '#c2b900'
    },
    error: {
      main: '#fa4542'
    },
  },
});

export default UiTheme;
