import { Action, Actions } from '../actions/instructor_dashboard';
import { SharedAction, SharedActions } from '../actions/sharedActions';
import { Assignment, Cohort, Deliverable } from '../Types';

export type InstructorDashboardState = InstructorDashboardUI & InstructorDashboardData;

interface InstructorDashboardUI {
  // Assignment
  showAddAssignment: boolean;
  showAllAssignments: boolean;
  showEditAssignment: boolean;
  selectedAssignment: Assignment | null;
  // Deliverable
  showAddDeliverable: boolean;
  showEditDeliverable: boolean;
  selectedDeliverable: Deliverable | null;

  showAllCohorts: boolean;
  showAllDeliverables: boolean;
}

interface InstructorDashboardData {
  cohorts: Cohort[];
  assignments: Assignment[];
  deliverables: Deliverable[];
}

const blankState: InstructorDashboardState = {
  // Assignment
  showAddAssignment: false,
  showAllAssignments: false,
  showEditAssignment: false,
  selectedAssignment: null,
  // Deliverable
  showAddDeliverable: false,
  showEditDeliverable: false,
  selectedDeliverable: null,
  showAllCohorts: false,
  showAllDeliverables: false,
  cohorts: [],
  assignments: [],
  deliverables: [],
};

export function instructorDashboardReducer(state: InstructorDashboardState = blankState, action: Action | SharedAction): InstructorDashboardState {
  switch (action.type) {
    case Actions.TOGGLE_ADD_ASSIGNMENT:
      return {
        ...state,
        showAddAssignment: !state.showAddAssignment,
      };
    case Actions.TOGGLE_EDIT_ASSIGNMENT:
      return {
        ...state,
        showEditAssignment: !state.showEditAssignment,
      };
    case Actions.TOGGLE_ADD_DELIVERABLE:
      return {
        ...state,
        showAddDeliverable: !state.showAddDeliverable,
      };
    case Actions.TOGGLE_EDIT_DELIVERABLE:
      return {
        ...state,
        showEditDeliverable: !state.showEditDeliverable,
      };
    case Actions.TOGGLE_SHOW_ASSIGNMENTS:
      return {
        ...state,
        showAllAssignments: !state.showAllAssignments,
      };
    case Actions.TOGGLE_SHOW_COHORTS:
      return {
        ...state,
        showAllCohorts: !state.showAllCohorts,
      };
    case Actions.TOGGLE_SHOW_DELIVERABLES:
      return {
        ...state,
        showAllDeliverables: !state.showAllDeliverables,
      };
  // Cohort
    case Actions.COHORT_REFRESH_STORE:
      return {
        ...state,
        cohorts: action.payload,
      }
  // Assignment
    case Actions.ASSIGNMENT_REFRESH_STORE:
      return {
        ...state,
        assignments: action.payload,
      };
    case Actions.ASSIGNMENT_ADD_TO_STORE:
      return {
        ...state,
        assignments: state.assignments.concat(action.payload),
      };
    case Actions.ASSIGNMENT_REMOVE_FROM_STORE:
      return {
        ...state,
        assignments: state.assignments.filter((assignment: Assignment) => (
          assignment._id !== action.payload
        )),
      };
    case Actions.ASSIGNMENT_UPDATE_IN_STORE:
      return {
        ...state,
        assignments: state.assignments.map((assignment: Assignment) => (
          assignment._id === action.payload._id ? action.payload : assignment
        )),
      };
    case Actions.ASSIGNMENT_SELECT:
      return {
        ...state,
        selectedAssignment: action.payload,
        // showEditAssignment: !!action.payload,
      };
  // Deliverable
    case Actions.DELIVERABLE_REFRESH_STORE:
      return {
        ...state,
        deliverables: action.payload,
      };
    case Actions.DELIVERABLE_ADD_TO_STORE:
      return {
        ...state,
        deliverables: state.deliverables.concat(action.payload),
      };
    case Actions.DELIVERABLE_REMOVE_FROM_STORE:
      return {
        ...state,
        deliverables: state.deliverables.filter((deliverable: Deliverable) => (
          deliverable._id !== action.payload
        )),
      };
    case Actions.DELIVERABLE_UPDATE_IN_STORE:
      return {
        ...state,
        deliverables: state.deliverables.map((deliverable: Deliverable) => (
          deliverable._id === action.payload._id ? action.payload : deliverable
        )),
      };
  // Shared Actions
    case SharedActions.RESET:
      return blankState;
    default:
      return state;
  }
}
