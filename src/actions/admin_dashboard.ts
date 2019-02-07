/*
 * action types
 */

export type Action =
  | ToggleAddCohort
  | ToggleSendRegistration
  | ToggleEditUser
  | OtherAction;


export enum Actions {
  TOGGLE_ADD_COHORT = 'TOGGLE_ADD_COHORT',
  TOGGLE_SEND_REGISTRATION = 'TOGGLE_SEND_REGISTRATION',
  TOGGLE_EDIT_USER = 'TOGGLE_EDIT_USER',
  OTHER_ACTION = '__any_other_action__',
}

export interface ToggleAddCohort {
  type: Actions.TOGGLE_ADD_COHORT;
}

export interface ToggleSendRegistration {
  type: Actions.TOGGLE_SEND_REGISTRATION;
}

export interface ToggleEditUser {
  type: Actions.TOGGLE_EDIT_USER;
}

export interface OtherAction {
  type: Actions.OTHER_ACTION;
}

/*
 * action creators
 */

export const toggleAddCohort = (): ToggleAddCohort  => ({
  type: Actions.TOGGLE_ADD_COHORT,
});

export const toggleEditUser = (): ToggleEditUser  => ({
  type: Actions.TOGGLE_EDIT_USER,
});

export const toggleSendRegistration = (): ToggleSendRegistration  => ({
  type: Actions.TOGGLE_SEND_REGISTRATION,
});

export const OtherAction = (): OtherAction => ({
  type: Actions.OTHER_ACTION,
});

/*
 * dispatch functions (async)
 */
