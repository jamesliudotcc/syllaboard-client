import { Action, Actions } from '../actions/instructor_dashboard';

export interface InstructorDashboardState {
  showAddAssignment: boolean;
  showAddDeliverable: boolean;
}

const blankState: InstructorDashboardState = {
  showAddAssignment: false,
  showAddDeliverable: false,
};

export function instructorDashboardReducer(state: InstructorDashboardState = blankState, action: Action): InstructorDashboardState {
  switch (action.type) {
    case Actions.TOGGLE_ADD_ASSIGNMENT:
      return {...state, showAddAssignment: !state.showAddAssignment};
    case Actions.TOGGLE_ADD_DELIVERABLE:
      return {...state, showAddDeliverable: !state.showAddDeliverable};
    default:
      return state;
  }
}
