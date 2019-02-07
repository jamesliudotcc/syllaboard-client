import * as React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { authUser } from './actions/auth';
import configureStore, { history } from './configureStore';

import App from './App';

const store = configureStore();

const token = localStorage.getItem('token');
if (token) {
  store.dispatch(authUser());
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
