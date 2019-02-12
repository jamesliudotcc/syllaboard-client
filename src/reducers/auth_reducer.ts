import { Action, Actions } from '../actions/auth';
import { Role } from '../Types';

export interface AuthState {
  authenticated: boolean;
  error: string;
  role: Role;
}

const blankState: AuthState = {
  authenticated: false,
  error: '',
  role: null,
};

export function authReducer(state: AuthState = blankState, action: Action) {
  switch (action.type) {
    case Actions.AUTH_USER:
      const role = action.payload;
      return { ...state, error: '', authenticated: true, role };
    case Actions.UNAUTH_USER:
      return blankState;
    case Actions.AUTH_ERROR:
      return { ...state, error: action.payload };
    default:
      return state;
  }
}
