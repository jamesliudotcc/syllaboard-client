import axios from 'axios';
import * as AC from './creators';
import * as AT from './types';

import { Credentials } from '../Types';

import { Dispatch } from 'redux';

const ROOT_URL = 'http://localhost:3090';

export const signinUser: any = ({email, password}: Credentials): (dispatch: Dispatch) => void => {
  return (dispatch) => {
    // submit email and password to server
    const request = axios.post(`${ROOT_URL}/signin`, {email, password});
    request
      .then((response) => {
        // -Save the JWT token
        localStorage.setItem('token', response.data.token);

        // -if request is good, we need to update state to indicate user is authenticated
        dispatch(AC.authUser());
      })

      // If request is bad...
      // -Show an error to the user
      .catch(() => {
        dispatch(AC.authError('bad login info'));
      });
  };
};

export const signoutUser = () => {
  localStorage.removeItem('token');
  return AC.unAuthUser();
};

export const signupUser: any = ({email, password, passwordConfirmation}: Credentials) => {
  return (dispatch: any) => {
    axios.post(`${ROOT_URL}/signup`, {email, password, passwordConfirmation})
      .then((response) => {
        dispatch(AC.authUser());
        localStorage.setItem('token', response.data.token);
      })
      .catch(({response}) => {
        dispatch(AC.authError(response.data.error));
      });
  };
};

export const fetchMessage: any = () => {
  return (dispatch: any) => {
    axios.get(ROOT_URL, {
      headers: {authorization: localStorage.getItem('token')},
    })
      .then((response) => {
        dispatch(AC.fetchMessage(response.data.message));
      });
  };
};

export type DispatchFunction = (dispatch: Dispatch) => void;
export type AsyncDispatch = (args?: any) => DispatchFunction;
export interface Credentials {
  email: string;
  password: string;
  passwordConfirmation?: string;
}

// interface for mapDispatchToProps
export interface DispatchPropTypes {
  fetchMessage: typeof fetchMessage;
  signupUser: typeof signupUser;
  signoutUser: typeof signoutUser;
  signinUser: typeof signinUser;
  authError: typeof AC.authError;
}
