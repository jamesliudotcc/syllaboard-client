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
  overrides: {
    MuiBackdrop: {
      root: {
        backgroundColor: '#1f364294',
      }
    },
    MuiFormControl: {
      root: {
        width: '100%',
      }
    },
    MuiCardContent: {
      root: {
        textAlign: 'center',
      }
    }
  },
  
});

export default UiTheme;
// MuiBackdrop