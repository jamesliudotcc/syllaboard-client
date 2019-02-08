import axios from 'axios';
import { AxiosResponse } from 'axios';
import { Dispatch } from 'redux';
import { SERVER_URL } from '../constants';
import { Cohort, NewCohortInfo } from '../Types';
import { fetchFailed, fetchSuccess } from './notifications';

/*
 * action types
 */

export type Action = CreateCohort | GetAllCohorts | UpdateCohort | DeleteCohort;

export enum Actions {
  CREATE_COHORT = 'CREATE_COHORT',
  GET_ALL_COHORTS = 'GET_ALL_COHORTS',
  UPDATE_COHORT = 'UPDATE_COHORT',
  DELETE_COHORT = 'DELETE_COHORT',
  OTHER_ACTION = '__any_other_action__',
}

export interface CreateCohort {
  type: Actions.CREATE_COHORT;
  payload: Cohort;
}
export interface GetAllCohorts {
  type: Actions.GET_ALL_COHORTS;
  payload: Cohort[];
}
export interface UpdateCohort {
  type: Actions.UPDATE_COHORT;
  payload: Cohort;
}
export interface DeleteCohort {
  type: Actions.DELETE_COHORT;
  payload: Cohort;
}
export interface OtherAction {
  type: Actions.OTHER_ACTION;
}

/*
 * action creators
 */

export const createCohort = (payload: Cohort): CreateCohort => ({
  type: Actions.CREATE_COHORT,
  payload,
});
export const getAllCohorts = (payload: Cohort[]): GetAllCohorts => ({
  type: Actions.GET_ALL_COHORTS,
  payload,
});
export const updateCohort = (payload: Cohort): UpdateCohort => ({
  type: Actions.UPDATE_COHORT,
  payload,
});
export const deleteCohort = (payload: Cohort): DeleteCohort => ({
  type: Actions.DELETE_COHORT,
  payload,
});

/*
 * dispatch functions (async)
 */

export const addNewCohort = (input: NewCohortInfo) => {
  return (dispatch: Dispatch): void => {
    axios.post(
        `${SERVER_URL}/admin/cohort`,
        { data: input },
        { headers: { authorization: localStorage.getItem('token') } },
      )
      .then((response: AxiosResponse) => {
        // TODO: Add updated info to redux state
        console.log(response);
        dispatch(fetchSuccess(response.statusText))
      })
      .catch(({ response }: { response: AxiosResponse }) => {
        dispatch(fetchFailed(response.statusText));
      });
  };
};