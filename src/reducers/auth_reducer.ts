import { Action, Actions } from '../actions/auth';

export interface AuthState {
  authenticated: boolean;
  error: string;
}

const blankState: AuthState = {
  authenticated: false,
  error: '',
};

export function authReducer(state: AuthState = blankState, action: Action) {
  switch (action.type) {
    case Actions.AUTH_USER:
      return {...state, error: '', authenticated: true};
    case Actions.UNAUTH_USER:
      return {...state, authenticated: false};
    case Actions.AUTH_ERROR:
      return {...state, error: action.payload};
    default:
      return state;
  }
}
