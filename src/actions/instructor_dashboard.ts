import axios, { AxiosResponse } from 'axios';
import { Dispatch } from 'redux';
import { SERVER_URL } from '../constants';
import { Assignment, Cohort, Deliverable, ID, NewAssignmentInfo, NewDeliverableInfo } from '../Types';
import { fetchFailed } from './notifications';


/*
 * action types
 */

export type Action =
  // UI
  | ToggleAddAssignment
  | ToggleAddDeliverable
  // Cohort
  | CohortRefreshStore
  // Assignment
  | AssignmentRefreshStore
  | AssignmentUpdateInStore 
  | AssignmentAddToStore
  | AssignmentRemoveFromStore
  // Deliverable
  | DeliverableRefreshStore
  | DeliverableUpdateInStore 
  | DeliverableAddToStore
  | DeliverableRemoveFromStore
  | OtherAction;


export enum Actions {
  // UI
  TOGGLE_ADD_ASSIGNMENT = 'TOGGLE_ADD_ASSIGNMENT',
  TOGGLE_ADD_DELIVERABLE = 'TOGGLE_ADD_DELIVERABLE',
  // Cohort
  COHORT_REFRESH_STORE = 'COHORT_REFRESH_STORE',
  // Assignment
  ASSIGNMENT_REFRESH_STORE = 'ASSIGNMENT_REFRESH_STORE',
  ASSIGNMENT_ADD_TO_STORE = 'ASSIGNMENT_ADD_TO_STORE',
  ASSIGNMENT_UPDATE_IN_STORE = 'ASSIGNMENT_UPDATE_IN_STORE',
  ASSIGNMENT_REMOVE_FROM_STORE = 'ASSIGNMENT_REMOVE_FROM_STORE',
  // Deliverable
  DELIVERABLE_REFRESH_STORE = 'DELIVERABLE_REFRESH_STORE',
  DELIVERABLE_ADD_TO_STORE = 'DELIVERABLE_ADD_TO_STORE',
  DELIVERABLE_UPDATE_IN_STORE = 'DELIVERABLE_UPDATE_IN_STORE',
  DELIVERABLE_REMOVE_FROM_STORE = 'DELIVERABLE_REMOVE_FROM_STORE',
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

// Cohort
export interface CohortRefreshStore {
  type: Actions.COHORT_REFRESH_STORE;
  payload: Cohort[];
}

// Assignment
export interface AssignmentRefreshStore {
  type: Actions.ASSIGNMENT_REFRESH_STORE;
  payload: Assignment[];
}

export interface AssignmentAddToStore {
  type: Actions.ASSIGNMENT_ADD_TO_STORE;
  payload: Assignment;
}

export interface AssignmentUpdateInStore {
  type: Actions.ASSIGNMENT_UPDATE_IN_STORE;
  payload: Assignment;
}

export interface AssignmentRemoveFromStore {
  type: Actions.ASSIGNMENT_REMOVE_FROM_STORE;
  payload: ID;
}

// Deliverable
export interface DeliverableRefreshStore {
  type: Actions.DELIVERABLE_REFRESH_STORE;
  payload: Deliverable[];
}

export interface DeliverableAddToStore {
  type: Actions.DELIVERABLE_ADD_TO_STORE;
  payload: Deliverable;
}

export interface DeliverableUpdateInStore {
  type: Actions.DELIVERABLE_UPDATE_IN_STORE;
  payload: Deliverable;
}

export interface DeliverableRemoveFromStore {
  type: Actions.DELIVERABLE_REMOVE_FROM_STORE;
  payload: ID;
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

// Cohort
export const cohortRefreshStore = (payload: Cohort[]) => ({
  type: Actions.COHORT_REFRESH_STORE,
  payload,
});

// Assignment

export const assignmentRefreshStore = (payload: Assignment[]) => ({
  type: Actions.ASSIGNMENT_REFRESH_STORE,
  payload,
});

export const assignmentAddToStore = (payload: Assignment) => ({
  type: Actions.ASSIGNMENT_ADD_TO_STORE,
  payload,
});

export const assignmentRemoveFromStore = (payload: Assignment) => ({
  type: Actions.ASSIGNMENT_REMOVE_FROM_STORE,
  payload,
});

export const assignmentUpdateInStore = (payload: Assignment) => ({
  type: Actions.ASSIGNMENT_UPDATE_IN_STORE,
  payload,
});

// Deliverable

export const deliverableRefreshStore = (payload: Deliverable[]) => ({
  type: Actions.DELIVERABLE_REFRESH_STORE,
  payload,
});

export const deliverableAddToStore = (payload: Deliverable) => ({
  type: Actions.DELIVERABLE_ADD_TO_STORE,
  payload,
});

export const deliverableRemoveFromStore = (payload: Deliverable) => ({
  type: Actions.DELIVERABLE_REMOVE_FROM_STORE,
  payload,
});

export const deliverableUpdateInStore = (payload: Deliverable) => ({
  type: Actions.DELIVERABLE_UPDATE_IN_STORE,
  payload,
});

// Other

export const OtherAction = (): OtherAction => ({
  type: Actions.OTHER_ACTION,
});


/*
 * dispatch functions (async)
 */

// Cohort

// Request all Cohorts from server and dispatch action to completely refresh store
export const getAllCohorts = () => {
  return (dispatch: Dispatch): void => {
    axios.get(
        `${SERVER_URL}/instructor/cohorts`,
        { headers: { authorization: localStorage.getItem('token') } },
      )
      .then((response: AxiosResponse) => {
        dispatch(cohortRefreshStore(response.data.cohorts));
      })
      .catch(({ response }: { response: AxiosResponse }) => {
        dispatch(fetchFailed(response.statusText));
      });
  }
};

// Assignment

// Send new assignment data to add to DB then dispatch action to add to store
export const addNewAssignment = (input: NewAssignmentInfo) => {
  return (dispatch: Dispatch):void => {
    axios.post(
        `${SERVER_URL}/instructor/assignments`,
        { data: input },
        { headers: { authorization: localStorage.getItem('token') } },
      )
      .then((response: AxiosResponse) => {
        console.log(response);
        dispatch(assignmentAddToStore(response.data.assignment));
      })
      .catch(({ response }: { response: AxiosResponse }) => {
        dispatch(fetchFailed(response.statusText));
      });
  };
};

// Send assignment with modified fields to be updated in DB and refresh store
export const updateAssignment = (input: Assignment) => {
  return (dispatch: Dispatch): void => {
    axios.put(
        `${SERVER_URL}/instructor/assignments/${input._id}`,
        { data: input },
        { headers: { authorization: localStorage.getItem('token') } },
      )
      .then((response: AxiosResponse) => {
        console.log(response);
        dispatch(assignmentUpdateInStore(response.data.edited));
      })
      .catch(({ response }: { response: AxiosResponse }) => {
        dispatch(fetchFailed(response.statusText));
      });
  };
};

// Send assignment with modified fields to be updated in DB and refresh store
export const removeAssignment = (input: Assignment) => {
  return (dispatch: Dispatch): void => {
    axios.delete(
        `${SERVER_URL}/instructor/assignments/${input._id}`,
        { headers: { authorization: localStorage.getItem('token') } },
      )
      .then((response: AxiosResponse) => {
        console.log(response);
        dispatch(assignmentRemoveFromStore(response.data.deleted));
      })
      .catch(({ response }: { response: AxiosResponse }) => {
        dispatch(fetchFailed(response.statusText));
      });
  };
};

// Request all Assignmentss from server and dispatch action to completely refresh store
export const getAllAssignments = () => {
  return (dispatch: Dispatch): void => {
    axios.get(
        `${SERVER_URL}/instructor/assignments`,
        { headers: { authorization: localStorage.getItem('token') } },
      )
      .then((response: AxiosResponse) => {
        dispatch(assignmentRefreshStore(response.data.assignments));
      })
      .catch(({ response }: { response: AxiosResponse }) => {
        dispatch(fetchFailed(response.statusText));
      });
  }

};

// Deliverable

// Send new deliverable data to add to DB then dispatch action to add to store
export const addNewDeliverable = (input: NewDeliverableInfo) => {
  return (dispatch: Dispatch):void => {
    axios.post(
        `${SERVER_URL}/instructor/deliverables`,
        { data: input },
        { headers: { authorization: localStorage.getItem('token') } },
      )
      .then((response: AxiosResponse) => {
        console.log(response);
        dispatch(deliverableAddToStore(response.data.deliverable));
      })
      .catch(({ response }: { response: AxiosResponse }) => {
        dispatch(fetchFailed(response.statusText));
      });
  };
};

// Send deliverable with modified fields to be updated in DB and refresh store
export const updateDeliverable = (input: Deliverable) => {
  return (dispatch: Dispatch): void => {
    axios.put(
        `${SERVER_URL}/instructor/deliverables/${input._id}`,
        { data: input },
        { headers: { authorization: localStorage.getItem('token') } },
      )
      .then((response: AxiosResponse) => {
        console.log(response);
        dispatch(deliverableUpdateInStore(response.data.edited));
      })
      .catch(({ response }: { response: AxiosResponse }) => {
        dispatch(fetchFailed(response.statusText));
      });
  };
};

// Send deliverable with modified fields to be updated in DB and refresh store
export const removeDeliverable = (input: Deliverable) => {
  return (dispatch: Dispatch): void => {
    axios.delete(
        `${SERVER_URL}/instructor/deliverables/${input._id}`,
        { headers: { authorization: localStorage.getItem('token') } },
      )
      .then((response: AxiosResponse) => {
        console.log(response);
        dispatch(deliverableRemoveFromStore(response.data.deleted));
      })
      .catch(({ response }: { response: AxiosResponse }) => {
        dispatch(fetchFailed(response.statusText));
      });
  };
};

// Request all Deliverabless from server and dispatch action to completely refresh store
export const getAllDeliverables = () => {
  return (dispatch: Dispatch): void => {
    axios.get(
        `${SERVER_URL}/instructor/deliverables`,
        { headers: { authorization: localStorage.getItem('token') } },
      )
      .then((response: AxiosResponse) => {
        dispatch(deliverableRefreshStore(response.data.deliverables));
      })
      .catch(({ response }: { response: AxiosResponse }) => {
        dispatch(fetchFailed(response.statusText));
      });
  }

};
