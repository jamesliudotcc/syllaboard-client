/*
 * action types
 */

export type Action =
  | ToggleAddAssignment
  | ToggleAddDeliverable
  | OtherAction;


export enum Actions {
  TOGGLE_ADD_ASSIGNMENT = 'TOGGLE_ADD_ASSIGNMENT',
  TOGGLE_ADD_DELIVERABLE = 'TOGGLE_ADD_DELIVERABLE',
  OTHER_ACTION = '__any_other_action__',
}

export interface ToggleAddAssignment {
  type: Actions.TOGGLE_ADD_ASSIGNMENT;
}

export interface ToggleAddDeliverable {
  type: Actions.TOGGLE_ADD_DELIVERABLE;
}

export interface OtherAction {
  type: Actions.OTHER_ACTION;
}

/*
 * action creators
 */

export const toggleAddAssignment = (): ToggleAddAssignment  => ({
  type: Actions.TOGGLE_ADD_ASSIGNMENT,
});

export const toggleAddDeliverable = (): ToggleAddDeliverable  => ({
  type: Actions.TOGGLE_ADD_DELIVERABLE,
});

export const OtherAction = (): OtherAction => ({
  type: Actions.OTHER_ACTION,
});

/*
 * dispatch functions (async)
 */
