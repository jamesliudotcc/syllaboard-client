/*
 * action types
 */

export type Action =
  | ToggleTurnInDeliverable
  | OtherAction;


export enum Actions {
  TOGGLE_TURN_IN_DELIVERABLE = 'TOGGLE_TURN_IN_DELIVERABLE',
  OTHER_ACTION = '__any_other_action__',
}

export interface ToggleTurnInDeliverable {
  type: Actions.TOGGLE_TURN_IN_DELIVERABLE;
}

export interface OtherAction {
  type: Actions.OTHER_ACTION;
}

/*
 * action creators
 */

export const toggleTurnInDeliverable = (): ToggleTurnInDeliverable  => ({
  type: Actions.TOGGLE_TURN_IN_DELIVERABLE,
});

export const OtherAction = (): OtherAction => ({
  type: Actions.OTHER_ACTION,
});

/*
 * dispatch functions (async)
 */
