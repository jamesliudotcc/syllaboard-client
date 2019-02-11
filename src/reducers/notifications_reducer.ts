import { Action, Actions } from '../actions/notifications';
import { SharedAction, SharedActions } from '../actions/sharedActions';

export interface NotificationState {
  message: string;
}

const blankState: NotificationState = {
  message: '',
};

export function notificationsReducer(state: NotificationState = blankState, action: Action | SharedAction): NotificationState {
  switch (action.type) {
    case Actions.FETCH_PENDING:
      return {...state, message: action.payload};
    case Actions.FETCH_SUCCESS:
      return {...state, message: action.payload};
    case Actions.FETCH_FAILED:
      return {...state, message: action.payload};
    case SharedActions.RESET:
      return blankState;
    default:
      return state;
  }
}