import axios, { AxiosError, AxiosResponse } from 'axios';
import { Dispatch } from 'redux';
import { SERVER_URL } from '../constants';
import { Deliverable, TurnInDeliverableInfo } from '../Types';
import { fetchFailed } from './notifications';

/*
 * action types
 */

export type Action =
  // UI
  | ToggleTurnInDeliverable
  | ToggleShowDeliverables
  // Deliverable
  | DeliverableRefreshStore
  | DeliverableUpdateInStore
  | DeliverableSelect
  // Default Case
  | OtherAction;

export enum Actions {
  TOGGLE_TURN_IN_DELIVERABLE = 'STUDENT_TOGGLE_TURN_IN_DELIVERABLE',
  TOGGLE_SHOW_DELIVERABLES = 'STUDENT_TOGGLE_SHOW_DELIVERABLES',
  DELIVERABLE_REFRESH_STORE = 'STUDENT_DELIVERABLE_REFRESH_STORE',
  DELIVERABLE_UPDATE_IN_STORE = 'STUDENT_DELIVERABLE_UPDATE_IN_STORE',
  DELIVERABLE_SELECT = 'STUDENT_DELIVERABLE_SELECT',
  OTHER_ACTION = 'STUDENT__any_other_action__',
}

export interface ToggleTurnInDeliverable {
  type: Actions.TOGGLE_TURN_IN_DELIVERABLE;
}

export interface ToggleShowDeliverables {
  type: Actions.TOGGLE_SHOW_DELIVERABLES;
}

export interface DeliverableRefreshStore {
  type: Actions.DELIVERABLE_REFRESH_STORE;
  payload: Deliverable[];
}

export interface DeliverableUpdateInStore {
  type: Actions.DELIVERABLE_UPDATE_IN_STORE;
  payload: Deliverable;
}

export interface DeliverableSelect {
  type: Actions.DELIVERABLE_SELECT;
  payload: Deliverable | null;
}

export interface OtherAction {
  type: Actions.OTHER_ACTION;
}

/*
 * action creators
 */

export const toggleTurnInDeliverable = (): ToggleTurnInDeliverable => ({
  type: Actions.TOGGLE_TURN_IN_DELIVERABLE,
});

export const toggleShowDeliverables = (): ToggleShowDeliverables => ({
  type: Actions.TOGGLE_SHOW_DELIVERABLES,
});

export const deliverableRefreshStore = (payload: Deliverable[]): DeliverableRefreshStore => ({
  type: Actions.DELIVERABLE_REFRESH_STORE,
  payload,
});

export const deliverableUpdateInStore = (payload: Deliverable): DeliverableUpdateInStore => ({
  type: Actions.DELIVERABLE_UPDATE_IN_STORE,
  payload,
});

export const deliverableSelect = (payload: Deliverable | null): DeliverableSelect => ({
  type: Actions.DELIVERABLE_SELECT,
  payload,
});

export const OtherAction = (): OtherAction => ({
  type: Actions.OTHER_ACTION,
});

/*
 * dispatch functions (async)
 */



// Get all Deliverables for student and refresh store 
export const getAllDeliverables = () => {
  return (dispatch: Dispatch): void => {
    axios.get(
        `${SERVER_URL}/student/deliverables`,
        { headers: { authorization: localStorage.getItem('token') } },
      )
      .then((response: AxiosResponse) => {
        dispatch(deliverableRefreshStore(response.data.deliverables));
      })
      .catch(handleError(dispatch));
  }
};

// Turn in deliverable
export const updateDeliverable = (input: TurnInDeliverableInfo) => {
  return (dispatch: Dispatch): void => {
    axios.put(
        `${SERVER_URL}/student/deliverables/${input.deliverableId}`,
        input,
        { headers: { authorization: localStorage.getItem('token') } },
      )
      .then((response: AxiosResponse) => {
        console.log(response);
        dispatch(deliverableUpdateInStore(response.data.updatedDeliverable));
      })
      .catch(handleError(dispatch));
  };
};


const handleError = (dispatch: Dispatch) => (error: AxiosError) => {
  if (error.response) {
    dispatch(fetchFailed(error.response.data));
  } else if (error.request) {
    dispatch(fetchFailed(error.request));
  } else {
    dispatch(fetchFailed(error.message));
  }
}
