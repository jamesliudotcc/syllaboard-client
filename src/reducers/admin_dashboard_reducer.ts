import { Action, Actions } from '../actions/admin_dashboard';

export interface AdminDashboardState {
  showAddCohort: boolean;
  showSendRegistration: boolean;
  showEditUser: boolean;
}

const blankState: AdminDashboardState = {
  showAddCohort: false,
  showEditUser: false,
  showSendRegistration: false,
};

export function adminDashboardReducer(state: AdminDashboardState = blankState, action: Action): AdminDashboardState {
  switch (action.type) {
    case Actions.TOGGLE_ADD_COHORT:
      return {...state, showAddCohort: !state.showAddCohort};
    case Actions.TOGGLE_EDIT_USER:
      return {...state, showEditUser: !state.showEditUser};
    case Actions.TOGGLE_SEND_REGISTRATION:
      return {...state, showSendRegistration: !state.showSendRegistration};
    default:
      return state;
  }
}
