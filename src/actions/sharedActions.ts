/*
 * Actions that can be shared with all reducers
 */

export type SharedAction = Reset;

export interface Reset {
  type: SharedActions.RESET,
}

// test.enum.ts
export enum SharedActions {
  RESET = 'SHARED_RESET',
}

export const resetAll = (): Reset => ({
  type: SharedActions.RESET,
});
