import * as AT from './types';

/*
 * action creators
 */

export const authUser = (): AT.AuthUser => ({
  type: AT.Actions.AUTH_USER,
});

export const unAuthUser = (): AT.UnAuthUser => ({
  type: AT.Actions.UNAUTH_USER,
});

export const authError = (payload: string): AT.AuthError => ({
  payload,
  type: AT.Actions.AUTH_ERROR,
});

export const fetchMessage = (payload: string): AT.FetchMessage => ({
  payload,
  type: AT.Actions.FETCH_MESSAGE,
});

export const OtherAction = (): AT.OtherAction => ({
  type: AT.Actions.OTHER_ACTION,
});
