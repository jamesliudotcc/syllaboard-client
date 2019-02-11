import axios from 'axios';
import { Dispatch } from 'redux';
import { SERVER_URL } from '../constants';

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

export const OtherAction = (): OtherAction => ({
  type: Actions.OTHER_ACTION,
});


/*
 * dispatch functions (async)
 */

export const fetchMessage = () => {
  return (dispatch: Dispatch): void => {
    dispatch(fetchPending('...Loading'));
    axios.get(`${SERVER_URL}/auth/test`, {
        headers: { authorization: localStorage.getItem('token') },
      })
      .then(response => {
        dispatch(fetchSuccess(response.data.message));
      })
      // TODO: define error type
      .catch(error => {
        console.log(error);
        dispatch(fetchFailed('Failed to load secret message.'));
      });
  };
};