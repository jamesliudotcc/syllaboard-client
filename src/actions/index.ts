import axios from 'axios';
import { Dispatch } from 'redux';
import { Credentials } from '../Types';
import * as AC from './creators';
import * as AT from './types';

const ROOT_URL = 'http://localhost:3090';

export const signinUser = ({email, password}: Credentials) => {
  return (dispatch: Dispatch): void => {
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

export const signoutUser = (): AT.UnAuthUser => {
  localStorage.removeItem('token');
  return AC.unAuthUser();
};

export const signupUser = ({email, password, passwordConfirmation}: Credentials) => {
  return (dispatch: Dispatch): void => {
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

export const fetchMessage = () => {
  return (dispatch: Dispatch): void => {
    axios.get(ROOT_URL, {
      headers: {authorization: localStorage.getItem('token')},
    })
      .then((response) => {
        dispatch(AC.fetchMessage(response.data.message));
      });
  };
};
