import { Cohort } from '../Types';

/*
 * action types for cohort
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

// Creators

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
 * dispatch function types
 */
