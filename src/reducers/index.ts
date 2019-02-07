import { connectRouter, RouterState } from 'connected-react-router';
import { History } from 'history';
import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import { authReducer, AuthState} from './auth_reducer';
import { notificationsReducer, NotificationState } from './notifications_reducer';

const rootReducer = (history: History) => combineReducers({
  auth: authReducer,
  notifications: notificationsReducer,
  form,
  router: connectRouter(history),
});

export interface State {
  auth: AuthState;
  notifications: NotificationState;
  router: RouterState;
}

export default rootReducer;
