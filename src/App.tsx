import { ConnectedRouter } from 'connected-react-router';
import {History} from 'history';
import React from 'react';
import routes from './routes';

import { MuiThemeProvider } from '@material-ui/core/styles';
import UiTheme from './style/theme'; 

import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider } from 'material-ui-pickers';


interface IAppProps {
  history: History;
}

const App = ({ history }: IAppProps) => {
  return (
    <ConnectedRouter history={history}>
      <MuiThemeProvider theme={UiTheme}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          { routes }
        </MuiPickersUtilsProvider>
      </MuiThemeProvider>
    </ConnectedRouter>
  );
};

export default App;
