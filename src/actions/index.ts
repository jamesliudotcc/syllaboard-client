import axios from 'axios';
import { Dispatch } from 'redux';
import { SERVER_URL } from '../constants';
import { Credentials, SignUpInfo } from '../Types';
import * as AC from './creators';
import * as AT from './types';

/*
 * Dispatch Actions
 */

export const signinUser = ({ email, password }: Credentials) => {
  return (dispatch: Dispatch): void => {
    // submit email and password to server
    const request = axios.post(`${SERVER_URL}/auth/signin`, {
      email,
      password,
    });
    request
      .then(response => {
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

export const signoutUser = (): AT.UnAuthUser => {
  localStorage.removeItem('token');
  return AC.unAuthUser();
};

export const signupUser = ({
  firstName,
  lastName,
  email,
  password,
}: SignUpInfo) => {
  return (dispatch: Dispatch): void => {
    axios
      .post(`${SERVER_URL}/auth/signup`, {
        firstName,
        lastName,
        email,
        password,
      })
      .then(response => {
        dispatch(AC.authUser());
        localStorage.setItem('token', response.data.token);
      })
      .catch(({ response }) => {
        dispatch(AC.authError(response.data.error));
      });
  };
};

export const fetchMessage = () => {
  return (dispatch: Dispatch): void => {
    axios
      .get(`${SERVER_URL}/auth/test`, {
        headers: { authorization: localStorage.getItem('token') },
      })
      .then(response => {
        dispatch(AC.fetchMessage(response.data.message));
      });
  };
};
