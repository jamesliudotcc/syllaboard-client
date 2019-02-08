import { Action, Actions } from '../actions/admin_dashboard';
import { Cohort } from '../Types';

export type AdminDashboardState = AdminDashboardUI & AdminDashboardData;

interface AdminDashboardUI {
  showAddCohort: boolean;
  showSendRegistration: boolean;
  showEditUser: boolean;
}

interface AdminDashboardData {
  cohorts: Cohort[];
}

const blankState: AdminDashboardState = {
  showAddCohort: false,
  showEditUser: false,
  showSendRegistration: false,
  cohorts: [],
};

export function adminDashboardReducer(state: AdminDashboardState = blankState, action: Action): AdminDashboardState {
  switch (action.type) {
  // UI
    case Actions.TOGGLE_ADD_COHORT:
      return {
        ...state,
        showAddCohort: !state.showAddCohort,
      };
    case Actions.TOGGLE_EDIT_USER:
      return {
        ...state,
        showEditUser: !state.showEditUser,
      };
    case Actions.TOGGLE_SEND_REGISTRATION:
      return {
        ...state,
        showSendRegistration: !state.showSendRegistration,
      };
  // Cohort
    case Actions.COHORT_REFRESH_STORE:
      return {
        ...state,
        cohorts: action.payload,
      };
    case Actions.COHORT_ADD_TO_STORE:
      return {
        ...state,
        cohorts: state.cohorts.concat(action.payload),
      };
    case Actions.COHORT_REMOVE_FROM_STORE:
      return {
        ...state,
        cohorts: state.cohorts.filter((cohort: Cohort) => (
          cohort.id !== action.payload
        )),
      };
    case Actions.COHORT_UPDATE_IN_STORE:
      return {
        ...state,
        cohorts: state.cohorts.map((cohort: Cohort) => (
          cohort.id === action.payload.id ? action.payload : cohort
        )),
      };
    default:
      return state;
  }
}
