import * as React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import * as AC from './actions/creators';
import configureStore, { history } from './configureStore';

import App from './App';

const store = configureStore();

const token = localStorage.getItem('token');
if (token) {
  store.dispatch(AC.authUser());
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
