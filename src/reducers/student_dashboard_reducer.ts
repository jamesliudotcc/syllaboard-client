import { SharedAction, SharedActions } from '../actions/sharedActions';
import { Action, Actions } from '../actions/student_dashboard';
import { Deliverable } from '../Types';

export type StudentDashboardState = StudentDashboardUI & StudentDashboardData;

export interface StudentDashboardUI {
  showAllDeliverables: boolean;
  showTurnInDeliverable: boolean;
  selectedDeliverable: Deliverable | null;
}

export interface StudentDashboardData {
  deliverables: Deliverable[];
}

const blankState: StudentDashboardState = {
  // UI
  showAllDeliverables: true,
  showTurnInDeliverable: false,
  // Deliverable
  deliverables: [],
  selectedDeliverable: null,
};

export function studentDashboardReducer(
  state: StudentDashboardState = blankState,
  action: Action | SharedAction,
): StudentDashboardState {
  switch (action.type) {
    // UI
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
    // Deliverable
    case Actions.DELIVERABLE_UPDATE_IN_STORE:
      return {
        ...state,
        deliverables: state.deliverables.map((deliverable: Deliverable) =>
          deliverable._id === action.payload._id ? action.payload : deliverable,
        ),
      };
    case Actions.DELIVERABLE_SELECT:
      return {
        ...state,
        selectedDeliverable: action.payload,
        showTurnInDeliverable: !!action.payload,
      };
    // Shared Actions
    case SharedActions.RESET:
      return blankState;
    default:
      return state;
  }
}
