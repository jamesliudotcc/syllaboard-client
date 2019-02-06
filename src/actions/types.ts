/*
 * action types
 */

export type Action =
  | AuthUser
  | UnAuthUser
  | AuthError
  | FetchMessage
  | OtherAction;


export enum Actions {
  AUTH_USER = 'AUTH_USER',
  UNAUTH_USER = 'UNAUTH_USER',
  AUTH_ERROR = 'AUTH_ERROR',
  FETCH_MESSAGE = 'FETCH_MESSAGE',
  OTHER_ACTION = '__any_other_action__',
}

export interface AuthUser {
  type: Actions.AUTH_USER;
}

export interface UnAuthUser {
  type: Actions.UNAUTH_USER;
}

export interface AuthError {
  type: Actions.AUTH_ERROR;
  payload: string;
}

export interface FetchMessage {
  type: Actions.FETCH_MESSAGE;
  payload: string;
}

export interface OtherAction {
  type: Actions.OTHER_ACTION;
}





/*
 * dispatch function types
 */
