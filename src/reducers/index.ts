import { connectRouter, RouterState } from 'connected-react-router';
import { History } from 'history';
import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import {
  adminDashboardReducer,
  AdminDashboardState,
} from './admin_dashboard_reducer';
import { authReducer, AuthState } from './auth_reducer';
import {
  instructorDashboardReducer,
  InstructorDashboardState,
} from './instructor_dashboard_reducer';
import {
  notificationsReducer,
  NotificationState,
} from './notifications_reducer';
import {
  studentDashboardReducer,
  StudentDashboardState,
} from './student_dashboard_reducer';

const rootReducer = (history: History) =>
  combineReducers({
    adminDashboard: adminDashboardReducer,
    auth: authReducer,
    instructorDashboard: instructorDashboardReducer,
    notifications: notificationsReducer,
    form,
    router: connectRouter(history),
    studentDashboard: studentDashboardReducer,
  });

export interface State {
  adminDashboard: AdminDashboardState;
  auth: AuthState;
  instructorDashboard: InstructorDashboardState;
  notifications: NotificationState;
  router: RouterState;
  studentDashboard: StudentDashboardState;
}

export default rootReducer;
