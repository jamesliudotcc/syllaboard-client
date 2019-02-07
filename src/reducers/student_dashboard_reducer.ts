import { Action, Actions } from '../actions/student_dashboard';

export interface StudentDashboardState {
  showTurnInDeliverable: boolean;
}

const blankState: StudentDashboardState = {
  showTurnInDeliverable: false,
};

export function studentDashboardReducer(state: StudentDashboardState = blankState, action: Action): StudentDashboardState {
  switch (action.type) {
    case Actions.TOGGLE_TURN_IN_DELIVERABLE:
      return {...state, showTurnInDeliverable: !state.showTurnInDeliverable};
    default:
      return state;
  }
}
