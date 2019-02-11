import { createMuiTheme } from '@material-ui/core/styles';

const UiTheme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
  palette: {
    primary: {
      main: '#ff2700',
      light: '#ff6737',
      dark: '#c30000',
    },
    secondary: {
      main: '#66B4DB',
      light: '#8FC8E4',
      dark: '#41738C',
    },
    error: {
      main: '#fa4542',
    },
  },
});

export default UiTheme;
