import { Action, Actions } from "../actions/cohort";
import actions from "redux-form/lib/actions";

export interface CohortState {
  //
}

const blankState: CohortState = {
  //
};

export function cohortReducer(state: CohortState = blankState, action: Action) {
  //
  switch (action.type) {
    case Actions.CREATE_COHORT:
      return { ...state, error: "" /* Get from database */ };
    case Actions.GET_ALL_COHORTS:
      return { ...state, error: "" /* Get from database */ };
    case Actions.UPDATE_COHORT:
      return { ...state, error: "" /* Get from database */ };
    case Actions.DELETE_COHORT:
      return { ...state, error: "" /* Get from database */ };
    default:
      return state;
  }
}
