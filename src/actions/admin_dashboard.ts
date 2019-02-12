import axios, { AxiosError, AxiosResponse } from 'axios';
import { Dispatch } from 'redux';
import { SERVER_URL } from '../constants';
import { Cohort, EditUserInfo, ID, NewCohortInfo, NewUserInfo, User } from '../Types';
import { fetchFailed } from './notifications';


/*
 * action types
 */

export type Action =
  // UI
  | ToggleAddCohort
  | ToggleEditCohort
  | ToggleShowCohorts
  | ToggleShowUsers
  | ToggleSendRegistration
  | ToggleEditUser
  // Cohorts
  | CohortRefreshStore
  | CohortAddToStore
  | CohortUpdateInStore
  | CohortRemoveFromStore
  | CohortSelect
  // Users
  | UserRefreshStore
  | UserUpdateInStore 
  | UserAddToStore
  | UserRemoveFromStore
  | UserSelect
  // Default Case 
  | OtherAction;


export enum Actions {
  // UI
  TOGGLE_ADD_COHORT = 'ADMIN_TOGGLE_ADD_COHORT',
  TOGGLE_EDIT_COHORT = 'ADMIN_TOGGLE_EDIT_COHORT',
  TOGGLE_SHOW_COHORTS = 'ADMIN_TOGGLE_SHOW_COHORTS',
  TOGGLE_SHOW_USERS = 'ADMIN_TOGGLE_SHOW_USERS',
  TOGGLE_SEND_REGISTRATION = 'ADMIN_TOGGLE_SEND_REGISTRATION',
  TOGGLE_EDIT_USER = 'ADMIN_TOGGLE_EDIT_USER',
  // Cohort
  COHORT_REFRESH_STORE = 'ADMIN_COHORT_REFRESH_STORE',
  COHORT_ADD_TO_STORE = 'ADMIN_COHORT_ADD_TO_STORE',
  COHORT_UPDATE_IN_STORE = 'ADMIN_COHORT_UPDATE_IN_STORE',
  COHORT_REMOVE_FROM_STORE = 'ADMIN_COHORT_REMOVE_FROM_STORE',
  COHORT_SELECT = 'ADMIN_COHORT_SELECT',
  // User
  USER_REFRESH_STORE = 'ADMIN_USER_REFRESH_STORE',
  USER_ADD_TO_STORE = 'ADMIN_USER_ADD_TO_STORE',
  USER_UPDATE_IN_STORE = 'ADMIN_USER_UPDATE_IN_STORE',
  USER_REMOVE_FROM_STORE = 'ADMIN_USER_REMOVE_FROM_STORE',
  USER_SELECT = 'ADMIN_USER_SELECT',
  OTHER_ACTION = 'ADMIN__any_other_action__',
}

// UI
export interface ToggleAddCohort {
  type: Actions.TOGGLE_ADD_COHORT;
}

export interface ToggleEditCohort {
  type: Actions.TOGGLE_EDIT_COHORT;
}

export interface ToggleShowCohorts {
  type: Actions.TOGGLE_SHOW_COHORTS;
}

export interface ToggleShowUsers {
  type: Actions.TOGGLE_SHOW_USERS;
}

export interface ToggleSendRegistration {
  type: Actions.TOGGLE_SEND_REGISTRATION;
}

export interface ToggleEditUser {
  type: Actions.TOGGLE_EDIT_USER;
}

// Cohort
export interface CohortRefreshStore {
  type: Actions.COHORT_REFRESH_STORE;
  payload: Cohort[];
}

export interface CohortAddToStore {
  type: Actions.COHORT_ADD_TO_STORE;
  payload: Cohort;
}

export interface CohortUpdateInStore {
  type: Actions.COHORT_UPDATE_IN_STORE;
  payload: Cohort;
}

export interface CohortRemoveFromStore {
  type: Actions.COHORT_REMOVE_FROM_STORE;
  payload: ID;
}

export interface CohortSelect {
  type: Actions.COHORT_SELECT;
  payload: Cohort | null;
}

// User
export interface UserRefreshStore {
  type: Actions.USER_REFRESH_STORE;
  payload: User[];
}

export interface UserAddToStore {
  type: Actions.USER_ADD_TO_STORE;
  payload: User;
}

export interface UserUpdateInStore {
  type: Actions.USER_UPDATE_IN_STORE;
  payload: User;
}

export interface UserRemoveFromStore {
  type: Actions.USER_REMOVE_FROM_STORE;
  payload: ID;
}

export interface UserSelect {
  type: Actions.USER_SELECT;
  payload: User | null;
}

export interface OtherAction {
  type: Actions.OTHER_ACTION;
}

/*
 * action creators
 */

// UI
export const toggleAddCohort = (): ToggleAddCohort  => ({
  type: Actions.TOGGLE_ADD_COHORT,
});

export const toggleEditCohort = (): ToggleEditCohort  => ({
  type: Actions.TOGGLE_EDIT_COHORT,
});

export const toggleShowCohorts = (): ToggleShowCohorts  => ({
  type: Actions.TOGGLE_SHOW_COHORTS,
});

export const toggleShowUsers = (): ToggleShowUsers  => ({
  type: Actions.TOGGLE_SHOW_USERS,
});

export const toggleEditUser = (): ToggleEditUser  => ({
  type: Actions.TOGGLE_EDIT_USER,
});

export const toggleSendRegistration = (): ToggleSendRegistration  => ({
  type: Actions.TOGGLE_SEND_REGISTRATION,
});

// Cohorts

export const cohortRefreshStore = (payload: Cohort[]) => ({
  type: Actions.COHORT_REFRESH_STORE,
  payload,
});

export const cohortAddToStore = (payload: Cohort) => ({
  type: Actions.COHORT_ADD_TO_STORE,
  payload,
});

export const cohortRemoveFromStore = (payload: ID) => ({
  type: Actions.COHORT_REMOVE_FROM_STORE,
  payload,
});

export const cohortUpdateInStore = (payload: Cohort) => ({
  type: Actions.COHORT_UPDATE_IN_STORE,
  payload,
});

export const cohortSelect = (payload: Cohort | null) => ({
  type: Actions.COHORT_SELECT,
  payload,
});

// User

export const userRefreshStore = (payload: User[]) => ({
  type: Actions.USER_REFRESH_STORE,
  payload,
});

export const userAddToStore = (payload: User) => ({
  type: Actions.USER_ADD_TO_STORE,
  payload,
});

export const userRemoveFromStore = (payload: ID) => ({
  type: Actions.USER_REMOVE_FROM_STORE,
  payload,
});

export const userUpdateInStore = (payload: User) => ({
  type: Actions.USER_UPDATE_IN_STORE,
  payload,
});

export const userSelect = (payload: User | null) => ({
  type: Actions.USER_SELECT,
  payload,
});


/*
 * dispatch functions (async)
 */

//
// Cohort
//

// Send new cohort data to add to DB then dispatch action to add to store
export const addNewCohort = (input: NewCohortInfo) => {
  return (dispatch: Dispatch): void => {
    axios.post(
        `${SERVER_URL}/admin/cohorts`,
        input,
        { headers: { authorization: localStorage.getItem('token') } },
      )
      .then((response: AxiosResponse) => {
        console.log(response);
        dispatch(cohortAddToStore(response.data.cohort));
      })
      .catch(handleError(dispatch));
  };
};

// Send cohort with modified fields to be updated in DB and refresh store
export const updateCohort = (input: Cohort) => {
  return (dispatch: Dispatch): void => {
    axios.put(
        `${SERVER_URL}/admin/cohorts/${input._id}`,
        input,
        { headers: { authorization: localStorage.getItem('token') } },
      )
      .then((response: AxiosResponse) => {
        console.log(response);
        dispatch(cohortUpdateInStore(response.data.edited));
      })
      .catch(handleError(dispatch));
  };
};

// Send cohort id to have removed from DB
export const removeCohort = (input: Cohort) => {
  return (dispatch: Dispatch): void => {
    axios.delete(
        `${SERVER_URL}/admin/cohorts/${input._id}`,
        { headers: { authorization: localStorage.getItem('token') } },
      )
      .then((response: AxiosResponse) => {
        console.log(response);
        dispatch(cohortRemoveFromStore(response.data.deleted.value._id));
      })
      .catch(handleError(dispatch));
  };
};

// Request all Cohorts from server and dispatch action to completely refresh store
export const getAllCohorts = () => {
  return (dispatch: Dispatch): void => {
    axios.get(
        `${SERVER_URL}/admin/cohorts`,
        { headers: { authorization: localStorage.getItem('token') } },
      )
      .then((response: AxiosResponse) => {
        dispatch(cohortRefreshStore(response.data.cohorts));
      })
      .catch(handleError(dispatch));
  }
};

//
// User
//

// Send new user data to add to DB then dispatch action to add to store
export const addNewUsers = (input: NewUserInfo) => {
  return (dispatch: Dispatch): void => {
    axios.post(
        `${SERVER_URL}/admin/users`,
        input,
        { headers: { authorization: localStorage.getItem('token') } },
      )
      .then((response: AxiosResponse) => {
        console.log(response);
        dispatch(userAddToStore(response.data.user));
      })
      .catch(handleError(dispatch));
  };
};

// Send user with modified fields to be updated in DB and refresh store
export const updateUser = (input: EditUserInfo) => {
  return (dispatch: Dispatch): void => {
    axios.put(
        `${SERVER_URL}/admin/users/${input._id}`,
        input,
        { headers: { authorization: localStorage.getItem('token') } },
      )
      .then((response: AxiosResponse) => {
        console.log(response);
        dispatch(userUpdateInStore(response.data.edited));
      })
      .catch(handleError(dispatch));
  };
};

// Send user id to have removed from DB
export const removeUser = (input: User) => {
  return (dispatch: Dispatch): void => {
    axios.delete(
        `${SERVER_URL}/admin/users/${input._id}`,
        { headers: { authorization: localStorage.getItem('token') } },
      )
      .then((response: AxiosResponse) => {
        console.log(response);
        dispatch(userRemoveFromStore(response.data.deleted.value._id));
      })
      .catch(handleError(dispatch));
  };
};

// Request all Userss from server and dispatch action to completely refresh store
export const getAllUsers = () => {
  return (dispatch: Dispatch): void => {
    axios.get(
        `${SERVER_URL}/admin/users`,
        { headers: { authorization: localStorage.getItem('token') } },
      )
      .then((response: AxiosResponse) => {
        dispatch(userRefreshStore(response.data.users));
      })
      .catch(handleError(dispatch));
  }
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
