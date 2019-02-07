import { Action, Actions } from '../actions/notifications';

export interface NotificationState {
  message: string;
}

const blankState: NotificationState = {
  message: '',
};

export function notificationsReducer(state: NotificationState = blankState, action: Action): NotificationState {
  switch (action.type) {
    case Actions.FETCH_PENDING:
      return {...state, message: action.payload};
    case Actions.FETCH_SUCCESS:
      return {...state, message: action.payload};
    case Actions.FETCH_FAILED:
      return {...state, message: action.payload};
    default:
      return state;
  }
}