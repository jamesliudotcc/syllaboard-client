import * as React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { authUser } from './actions/auth';
import configureStore, { history } from './configureStore';
import { Role } from './Types';

import App from './App';

const store = configureStore();

const token = localStorage.getItem('token');
const role = localStorage.getItem('role') as Role;

if (token && role) {
  store.dispatch(authUser(role));
}

const render = () => {
  ReactDOM.render(
    <Provider store={store}>
      <App history={history} />
    </Provider>,
    document.getElementById('root'),
  );
};

render();
