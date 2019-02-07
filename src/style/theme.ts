import { createMuiTheme } from '@material-ui/core/styles';

import { blue, indigo, red } from '@material-ui/core/colors';

const UiTheme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
  palette: {
    primary: indigo,
    secondary: blue,
    error: red,
  },
});

export default UiTheme;
