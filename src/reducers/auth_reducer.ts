import { Action, Actions } from '../actions/types';

export interface AuthState {
  authenticated: boolean;
  error: string;
}

export function authReducer(state: AuthState = {authenticated: false, error: ''}, action: Action) {
  switch (action.type) {
    case Actions.AUTH_USER:
      return {...state, error: '', authenticated: true};
    case Actions.UNAUTH_USER:
      return {...state, authenticated: false};
    case Actions.AUTH_ERROR:
      return {...state, error: action.payload};
    case Actions.FETCH_MESSAGE:
      return {...state, message: action.payload};
    default:
      return state;
  }
}
