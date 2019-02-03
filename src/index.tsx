import * as React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { AUTH_USER } from './actions/types';
import Header from './components/header';
import Welcome from './components/welcome';
import Signin from './components/auth/signin';
import Signout from './components/auth/signout';
import Signup from './components/auth/signup';
import { PrivateRoute } from './components/auth/require_auth';
import Feature from './components/feature';
import reducers from './reducers';

// store with history
import configureStore, { history } from './configureStore';

import App from './App';

// ORIGINAL STORE CREATION
// const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore)

// const store = createStoreWithMiddleware(
//   reducers,
//   // For time-travel debug with chrome/redux extension
//   (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__()
// );

const store = configureStore();

const token = localStorage.getItem('token');
if (token) {
  store.dispatch({type: AUTH_USER});
}

// ReactDOM.render(
//   <Provider store={store}>
//     <Router>
//         <div>
//           <Header/>
//           <Route path="/" exact={true} component={Welcome}/>
//           <Route path="/signin" component={Signin}/>
//           <Route path="/signout" component={Signout}/>
//           <Route path="/signup" component={Signup}/>
//           <PrivateRoute path="/feature" component={Feature}/>
//         </div>
//     </Router>
//   </Provider>
//   , document.getElementById('root'));

const render = () => {
  ReactDOM.render(
    <Provider store={store}>
      <App history={history} />
    </Provider>,
    document.getElementById('root'),
  );
};

render();

// <AppContainer></AppContainer>

  // import { AppContainer } from 'react-hot-loader'
  // // Hot reloading
  // if (module.hot) {
  //   // Reload components
  //   module.hot.accept('./App', () => {
  //     render()
  //   })
  // }
