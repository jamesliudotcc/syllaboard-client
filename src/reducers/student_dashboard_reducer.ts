import { Action, Actions } from '../actions/student_dashboard';
import { Deliverable } from '../Types';

export interface StudentDashboardState {
  showTurnInDeliverable: boolean;
  showAllDeliverables: boolean;
  selectedDeliverable: Deliverable | null;
  deliverables: Deliverable[];
}

const blankState: StudentDashboardState = {
  showTurnInDeliverable: false,
  showAllDeliverables: false,
  selectedDeliverable: null,
  deliverables: [],
};

export function studentDashboardReducer(state: StudentDashboardState = blankState, action: Action): StudentDashboardState {
  switch (action.type) {
    case Actions.TOGGLE_TURN_IN_DELIVERABLE:
      return {
        ...state,
        showTurnInDeliverable: !state.showTurnInDeliverable,
      };
    case Actions.TOGGLE_SHOW_DELIVERABLES:
      return {
        ...state,
        showAllDeliverables: !state.showAllDeliverables,
      };
    case Actions.DELIVERABLE_REFRESH_STORE:
      return {
        ...state,
        deliverables: action.payload,
      };
    case Actions.DELIVERABLE_UPDATE_IN_STORE:
      return {
        ...state,
        deliverables: state.deliverables.map((deliverable: Deliverable) => (
          deliverable._id === action.payload._id ? action.payload : deliverable
        )),
      };
    case Actions.DELIVERABLE_SELECT:
      return {
        ...state,
        selectedDeliverable: action.payload,
        showTurnInDeliverable: !!action.payload,
      };
    default:
      return state;
  }
}
