/*
 * action types
 */

export type Action =
  | FetchPending
  | FetchFailed
  | FetchSuccess
  | OtherAction;


export enum Actions {
  FETCH_PENDING = 'NOTIFICATION_FETCH_PENDING',
  FETCH_FAILED = 'NOTIFICATION_FETCH_FAILED',
  FETCH_SUCCESS = 'NOTIFICATION_FETCH_SUCCESS',
  OTHER_ACTION = 'NOTIFICATION__any_other_action__',
}


export interface FetchPending {
  type: Actions.FETCH_PENDING;
  payload: string;
}

export interface FetchFailed {
  type: Actions.FETCH_FAILED;
  payload: string;
}

export interface FetchSuccess {
  type: Actions.FETCH_SUCCESS;
  payload: string;
}

export interface OtherAction {
  type: Actions.OTHER_ACTION;
}

/*
 * action creators
 */


export const fetchFailed = (payload: string): FetchFailed => ({
  type: Actions.FETCH_FAILED,
  payload, 
});

export const fetchSuccess = (payload: string): FetchSuccess => ({
  type: Actions.FETCH_SUCCESS,
  payload, 
});

export const fetchPending = (payload: string): FetchPending => ({
  type: Actions.FETCH_PENDING,
  payload, 
});
