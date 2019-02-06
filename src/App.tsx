import { ConnectedRouter } from 'connected-react-router';
import {History} from 'history';
import React from 'react';
import routes from './routes';

import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
});

interface IAppProps {
  history: History;
}

const App = ({ history }: IAppProps) => {
  return (
    <ConnectedRouter history={history}>
      <MuiThemeProvider theme={theme}>
        { routes }
      </MuiThemeProvider>
    </ConnectedRouter>
  );
};

export default App;
