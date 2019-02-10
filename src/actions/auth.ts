import axios, { AxiosError } from 'axios';
import { Dispatch } from 'redux';
import { SERVER_URL } from '../constants';
import { Credentials, Role, SignUpInfo } from '../Types';
import { fetchFailed } from './notifications';


/*
 * action types
 */

export type Action =
  | AuthUser
  | UnAuthUser
  | AuthError
  | OtherAction;


export enum Actions {
  AUTH_USER = 'AUTH_USER',
  UNAUTH_USER = 'UNAUTH_USER',
  AUTH_ERROR = 'AUTH_ERROR',
  OTHER_ACTION = '__any_other_action__',
}

export interface AuthUser {
  type: Actions.AUTH_USER;
  payload: Role;
}

export interface UnAuthUser {
  type: Actions.UNAUTH_USER;
}

export interface AuthError {
  type: Actions.AUTH_ERROR;
  payload: string;
}

export interface OtherAction {
  type: Actions.OTHER_ACTION;
}

/*
 * action creators
 */

export const authUser = (payload: Role): AuthUser => ({
  type: Actions.AUTH_USER,
  payload,
});

export const unAuthUser = (): UnAuthUser => ({
  type: Actions.UNAUTH_USER,
});

export const authError = (payload: string): AuthError => ({
  payload,
  type: Actions.AUTH_ERROR,
});

export const OtherAction = (): OtherAction => ({
  type: Actions.OTHER_ACTION,
});

/*
 * dispatch functions (async)
 */

export const signinUser = ({ email, password }: Credentials) => {
  return (dispatch: Dispatch): void => {
    // submit email and password to server
    axios.post(`${SERVER_URL}/auth/signin`, {
      email,
      password,
    })
      .then(response => {
        // -Save the JWT token
        console.log(response);
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('role', response.data.role);

        // -if request is good, we need to update state to indicate user is authenticated
        dispatch(authUser(response.data.role));
      })

      // If request is bad...
      // -Show an error to the user
      .catch(() => {
        dispatch(authError('Bad login info'));
      });
  };
};

export const signoutUser = (): UnAuthUser => {
  localStorage.removeItem('token');
  localStorage.removeItem('role');
  return unAuthUser();
};

export const signupUser = ({
  firstName,
  lastName,
  email,
  password,
  cohortKey,
}: SignUpInfo) => {
  return (dispatch: Dispatch): void => {
    axios.post(`${SERVER_URL}/auth/signup`, {
        firstName,
        lastName,
        email,
        password,
        cohortKey,
      })
      .then(response => {
        console.log(response);
        localStorage.setItem('role', response.data.role);
        localStorage.setItem('token', response.data.token);
        dispatch(authUser(response.data.role));
      })
      .catch(handleError(dispatch));
  };
};

const handleError = (dispatch: Dispatch) => (error: AxiosError) => {
  if (error.response) {
    dispatch(fetchFailed(error.response.data));
  } else if (error.request) {
    dispatch(fetchFailed(error.request));
  } else {
    dispatch(fetchFailed(error.message));
  }
}
