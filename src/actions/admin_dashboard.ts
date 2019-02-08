import axios, { AxiosResponse } from 'axios';
import { SERVER_URL } from '../constants';

import { Dispatch } from 'redux';
import { Cohort, ID, NewCohortInfo } from '../Types';

import { fetchFailed } from './notifications';

import {AdminDashboardState} from '../reducers/admin_dashboard_reducer';

/*
 * action types
 */

export type Action =
  // UI
  | ToggleAddCohort
  | ToggleSendRegistration
  | ToggleEditUser
  // Cohorts
  | CohortRefreshStore
  | CohortAddToStore
  | CohortUpdateInStore
  | CohortRemoveFromStore
  | OtherAction;


export enum Actions {
  // UI
  TOGGLE_ADD_COHORT = 'TOGGLE_ADD_COHORT',
  TOGGLE_SEND_REGISTRATION = 'TOGGLE_SEND_REGISTRATION',
  TOGGLE_EDIT_USER = 'TOGGLE_EDIT_USER',
  // Cohort
  COHORT_REFRESH_STORE = 'COHORT_REFRESH_STORE',
  COHORT_ADD_TO_STORE = 'COHORT_ADD_TO_STORE',
  COHORT_UPDATE_IN_STORE = 'COHORT_UPDATE_IN_STORE',
  COHORT_REMOVE_FROM_STORE = 'COHORT_REMOVE_FROM_STORE',
  OTHER_ACTION = '__any_other_action__',
}

// UI
export interface ToggleAddCohort {
  type: Actions.TOGGLE_ADD_COHORT;
}

export interface ToggleSendRegistration {
  type: Actions.TOGGLE_SEND_REGISTRATION;
}

export interface ToggleEditUser {
  type: Actions.TOGGLE_EDIT_USER;
}

// Cohort
export interface CohortRefreshStore {
  type: Actions.COHORT_REFRESH_STORE;
  payload: Cohort[];
}

export interface CohortAddToStore {
  type: Actions.COHORT_ADD_TO_STORE;
  payload: Cohort;
}

export interface CohortUpdateInStore {
  type: Actions.COHORT_UPDATE_IN_STORE;
  payload: Cohort;
}

export interface CohortRemoveFromStore {
  type: Actions.COHORT_REMOVE_FROM_STORE;
  payload: ID;
}

export interface OtherAction {
  type: Actions.OTHER_ACTION;
}

/*
 * action creators
 */

// UI
export const toggleAddCohort = (): ToggleAddCohort  => ({
  type: Actions.TOGGLE_ADD_COHORT,
});

export const toggleEditUser = (): ToggleEditUser  => ({
  type: Actions.TOGGLE_EDIT_USER,
});

export const toggleSendRegistration = (): ToggleSendRegistration  => ({
  type: Actions.TOGGLE_SEND_REGISTRATION,
});

// Cohorts

export const cohortRefreshStore = (payload: Cohort[]) => ({
  type: Actions.COHORT_REFRESH_STORE,
  payload,
});

export const cohortAddToStore = (payload: Cohort) => ({
  type: Actions.COHORT_ADD_TO_STORE,
  payload,
});

export const cohortRemoveFromStore = (payload: ID) => ({
  type: Actions.COHORT_REMOVE_FROM_STORE,
  payload,
});

export const cohortUpdateInStore = (payload: Cohort) => ({
  type: Actions.COHORT_UPDATE_IN_STORE,
  payload,
});

export const OtherAction = (): OtherAction => ({
  type: Actions.OTHER_ACTION,
});

/*
 * dispatch functions (async)
 */

// Send new cohort data to add to DB then dispatch action to add to store
export const addNewCohort = (input: NewCohortInfo) => {
  return (dispatch: Dispatch): void => {
    axios.post(
        `${SERVER_URL}/admin/cohort`,
        { data: input },
        { headers: { authorization: localStorage.getItem('token') } },
      )
      .then((response: AxiosResponse) => {
        console.log(response);
        dispatch(cohortAddToStore(response.data.cohort));
      })
      .catch(({ response }: { response: AxiosResponse }) => {
        dispatch(fetchFailed(response.statusText));
      });
  };
};

// Send cohort with modified fields to be updated in DB and refresh store
export const updateCohort = (input: Cohort) => {
  return (dispatch: Dispatch): void => {
    axios.put(
        `${SERVER_URL}/admin/cohorts/${input.id}`,
        { data: input },
        { headers: { authorization: localStorage.getItem('token') } },
      )
      .then((response: AxiosResponse) => {
        console.log(response);
        dispatch(cohortUpdateInStore(response.data.edited));
      })
      .catch(({ response }: { response: AxiosResponse }) => {
        dispatch(fetchFailed(response.statusText));
      });
  };
};

// Send cohort with modified fields to be updated in DB and refresh store
export const removeCohort = (input: Cohort) => {
  return (dispatch: Dispatch): void => {
    axios.delete(
        `${SERVER_URL}/admin/cohorts/${input.id}`,
        { headers: { authorization: localStorage.getItem('token') } },
      )
      .then((response: AxiosResponse) => {
        console.log(response);
        dispatch(cohortRemoveFromStore(response.data.deleted));
      })
      .catch(({ response }: { response: AxiosResponse }) => {
        dispatch(fetchFailed(response.statusText));
      });
  };
};

// Request all Cohorts from server and dispatch action to completely refresh store
export const getAllCohorts = () => {
  return (dispatch: Dispatch): void => {
    axios.get(
        `${SERVER_URL}/admin/cohorts`,
        { headers: { authorization: localStorage.getItem('token') } },
      )
      .then((response: AxiosResponse) => {
        dispatch(cohortRefreshStore(response.data.cohorts));
      })
      .catch(({ response }: { response: AxiosResponse }) => {
        dispatch(fetchFailed(response.statusText));
      });
  }

};
