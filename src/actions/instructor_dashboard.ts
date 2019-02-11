import axios, { AxiosError, AxiosResponse } from 'axios';
import { Dispatch } from 'redux';
import { SERVER_URL } from '../constants';
import {
  Assignment,
  Cohort,
  Deliverable,
  GradeDeliverableInfo,
  ID,
  NewAssignmentInfo,
  NewDeliverableInfo,
} from '../Types';
import { fetchFailed } from './notifications';

/*
 * action types
 */

export type Action =
  // UI
  | ToggleAddAssignment
  | ToggleShowAssignments
  | ToggleEditAssignment
  | ToggleAddDeliverable
  | ToggleGradeDeliverable
  | ToggleShowDeliverables
  | ToggleShowCohorts
  // Cohort
  | CohortRefreshStore
  // Assignment
  | AssignmentRefreshStore
  | AssignmentUpdateInStore
  | AssignmentAddToStore
  | AssignmentRemoveFromStore
  | AssignmentSelect
  // Deliverable
  | DeliverableRefreshStore
  | DeliverableUpdateInStore
  | DeliverableAddToStore
  | DeliverableRemoveFromStore
  | DeliverableSelect
  | OtherAction;

export enum Actions {
  // UI
  TOGGLE_ADD_ASSIGNMENT = 'TOGGLE_ADD_ASSIGNMENT',
  TOGGLE_SHOW_ASSIGNMENTS = 'TOGGLE_SHOW_ASSIGNMENTS',
  TOGGLE_EDIT_ASSIGNMENT = 'TOGGLE_EDIT_ASSIGNMENT',
  TOGGLE_ADD_DELIVERABLE = 'TOGGLE_ADD_DELIVERABLE',
  TOGGLE_GRADE_DELIVERABLE = 'TOGGLE_GRADE_DELIVERABLE',
  TOGGLE_SHOW_DELIVERABLES = 'TOGGLE_SHOW_DELIVERABLES',
  TOGGLE_SHOW_COHORTS = 'TOGGLE_SHOW_COHORTS',
  // Cohort
  COHORT_REFRESH_STORE = 'COHORT_REFRESH_STORE',
  // Assignment
  ASSIGNMENT_REFRESH_STORE = 'ASSIGNMENT_REFRESH_STORE',
  ASSIGNMENT_ADD_TO_STORE = 'ASSIGNMENT_ADD_TO_STORE',
  ASSIGNMENT_UPDATE_IN_STORE = 'ASSIGNMENT_UPDATE_IN_STORE',
  ASSIGNMENT_REMOVE_FROM_STORE = 'ASSIGNMENT_REMOVE_FROM_STORE',
  ASSIGNMENT_SELECT = 'ASSIGNMENT_SELECT',
  // Deliverable
  DELIVERABLE_REFRESH_STORE = 'DELIVERABLE_REFRESH_STORE',
  DELIVERABLE_ADD_TO_STORE = 'DELIVERABLE_ADD_TO_STORE',
  DELIVERABLE_UPDATE_IN_STORE = 'DELIVERABLE_UPDATE_IN_STORE',
  DELIVERABLE_REMOVE_FROM_STORE = 'DELIVERABLE_REMOVE_FROM_STORE',
  DELIVERABLE_SELECT = 'DELIVERABLE_SELECT',
  OTHER_ACTION = '__any_other_action__',
}

export interface ToggleAddAssignment {
  type: Actions.TOGGLE_ADD_ASSIGNMENT;
}

export interface ToggleShowAssignments {
  type: Actions.TOGGLE_SHOW_ASSIGNMENTS;
}

export interface ToggleEditAssignment {
  type: Actions.TOGGLE_EDIT_ASSIGNMENT;
}

export interface ToggleAddDeliverable {
  type: Actions.TOGGLE_ADD_DELIVERABLE;
}

export interface ToggleGradeDeliverable {
  type: Actions.TOGGLE_GRADE_DELIVERABLE;
}

export interface ToggleShowDeliverables {
  type: Actions.TOGGLE_SHOW_DELIVERABLES;
}

export interface ToggleShowCohorts {
  type: Actions.TOGGLE_SHOW_COHORTS;
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

export interface AssignmentSelect {
  type: Actions.ASSIGNMENT_SELECT;
  payload: Assignment | null;
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

export interface DeliverableSelect {
  type: Actions.DELIVERABLE_SELECT;
  payload: Deliverable | null;
}

/*
 * action creators
 */

export const toggleAddAssignment = (): ToggleAddAssignment => ({
  type: Actions.TOGGLE_ADD_ASSIGNMENT,
});

export const toggleShowAssignments = (): ToggleShowAssignments => ({
  type: Actions.TOGGLE_SHOW_ASSIGNMENTS,
});

export const toggleEditAssignment = (): ToggleEditAssignment => ({
  type: Actions.TOGGLE_EDIT_ASSIGNMENT,
});

export const toggleAddDeliverable = (): ToggleAddDeliverable => ({
  type: Actions.TOGGLE_ADD_DELIVERABLE,
});

export const toggleGradeDeliverable = (): ToggleGradeDeliverable => ({
  type: Actions.TOGGLE_GRADE_DELIVERABLE,
});

export const toggleShowDeliverables = (): ToggleShowDeliverables => ({
  type: Actions.TOGGLE_SHOW_DELIVERABLES,
});

export const toggleShowCohorts = (): ToggleShowCohorts => ({
  type: Actions.TOGGLE_SHOW_COHORTS,
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

export const assignmentSelect = (payload: Assignment | null) => ({
  type: Actions.ASSIGNMENT_SELECT,
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

export const deliverableSelect = (payload: Deliverable | null) => ({
  type: Actions.DELIVERABLE_SELECT,
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

// Request all Instructor's cohorts from server and dispatch action to completely refresh store
export const getAllCohorts = () => {
  return (dispatch: Dispatch): void => {
    (async () => {
      try {
        const instructorCohorts = await axios.get(
          `${SERVER_URL}/instructor/cohorts`,
          { headers: { authorization: localStorage.getItem('token') } },
        );

        console.log(instructorCohorts);

        if (!instructorCohorts.data.cohorts) {
          return;
        }

        // Update store with basic info
        dispatch(cohortRefreshStore(instructorCohorts.data.cohorts));

        // Load the rest of the details and update store after
        const cohortsWithDetails = instructorCohorts.data.cohorts.map(
          (cohort: Cohort) =>
            axios.get(`${SERVER_URL}/instructor/cohorts/${cohort._id}`, {
              headers: { authorization: localStorage.getItem('token') },
            }),
        );

        axios.all(cohortsWithDetails).then(
          axios.spread((...responses: any[]) => {
            const cohorts = responses.map(response => response.data.cohort);
            return dispatch(cohortRefreshStore(cohorts));
          }),
        );
      } catch (error) {
        handleError(dispatch)(error);
      }
    })();
  };
};

// Assignment

// Send new assignment data to add to DB then dispatch action to add to store
export const addNewAssignment = (input: NewAssignmentInfo) => {
  return (dispatch: Dispatch): void => {
    axios
      .post(`${SERVER_URL}/instructor/assignments`, input, {
        headers: { authorization: localStorage.getItem('token') },
      })
      .then((response: AxiosResponse) => {
        console.log(response);
        dispatch(assignmentAddToStore(response.data.assignment));
      })
      .catch(handleError(dispatch));
  };
};

// Send assignment with modified fields to be updated in DB and refresh store
export const updateAssignment = (input: Assignment) => {
  return (dispatch: Dispatch): void => {
    axios
      .put(`${SERVER_URL}/instructor/assignments/${input._id}`, input, {
        headers: { authorization: localStorage.getItem('token') },
      })
      .then((response: AxiosResponse) => {
        console.log(response);
        dispatch(assignmentUpdateInStore(response.data.edited));
      })
      .catch(handleError(dispatch));
  };
};

// Send assignment with modified fields to be updated in DB and refresh store
export const removeAssignment = (input: Assignment) => {
  return (dispatch: Dispatch): void => {
    axios
      .delete(`${SERVER_URL}/instructor/assignments/${input._id}`, {
        headers: { authorization: localStorage.getItem('token') },
      })
      .then((response: AxiosResponse) => {
        console.log(response);
        dispatch(assignmentRemoveFromStore(response.data.deleted.value._id));
      })
      .catch(handleError(dispatch));
  };
};

// Request all Assignmentss from server and dispatch action to completely refresh store
export const getAllAssignments = () => {
  return (dispatch: Dispatch): void => {
    axios
      .get(`${SERVER_URL}/instructor/assignments`, {
        headers: { authorization: localStorage.getItem('token') },
      })
      .then((response: AxiosResponse) => {
        console.log(response);
        dispatch(assignmentRefreshStore(response.data.assignments));
      })
      .catch(handleError(dispatch));
  };
};

// Deliverable

// Send new deliverable data to add to DB then dispatch action to add to store
export const addNewDeliverable = (input: NewDeliverableInfo) => {
  return (dispatch: Dispatch): void => {
    axios
      .post(
        `${SERVER_URL}/instructor/cohorts/${input.cohortId}`,
        {
          assignmentId: input.assignmentId,
          dueDate: input.dueDate,
        },
        { headers: { authorization: localStorage.getItem('token') } },
      )
      .then((response: AxiosResponse) => {
        console.log(response);
        getAllDeliverables()(dispatch);
      })
      .catch(handleError(dispatch));
  };
};

// Send deliverable with modified fields to be updated in DB and refresh store
export const updateDeliverable = (input: Deliverable) => {
  return (dispatch: Dispatch): void => {
    axios
      .put(`${SERVER_URL}/instructor/deliverables/${input._id}`, input, {
        headers: { authorization: localStorage.getItem('token') },
      })
      .then((response: AxiosResponse) => {
        console.log(response);
        dispatch(deliverableUpdateInStore(response.data.edited));
      })
      .catch(handleError(dispatch));
  };
};

// Send in grade and mark completed in DB
export const gradeDeliverable = (input: GradeDeliverableInfo) => {
  return (dispatch: Dispatch): void => {
    axios
      .put(
        `${SERVER_URL}/instructor/deliverables/${input.deliverableId}`,
        {
          grade: input.grade,
          completed: new Date(),
        },
        { headers: { authorization: localStorage.getItem('token') } },
      )
      .then((response: AxiosResponse) => {
        console.log(response);
        dispatch(deliverableUpdateInStore(response.data.editedDeliverable));
      })
      .catch(handleError(dispatch));
  };
};

// TODO: implement and test
// Remove deliverable from DB
export const removeDeliverable = (input: Deliverable) => {
  return (dispatch: Dispatch): void => {
    axios
      .delete(`${SERVER_URL}/instructor/deliverables/${input._id}`, {
        headers: { authorization: localStorage.getItem('token') },
      })
      .then((response: AxiosResponse) => {
        console.log(response);
        dispatch(deliverableRemoveFromStore(response.data.deleted.value._id));
      })
      .catch(handleError(dispatch));
  };
};

// Request all Deliverabless from server and dispatch action to completely refresh store
export const getAllDeliverables = () => {
  return (dispatch: Dispatch): void => {
    (async () => {
      try {
        const instructorDeliverables = await axios.get(
          `${SERVER_URL}/instructor/deliverables`,
          { headers: { authorization: localStorage.getItem('token') } },
        );

        console.log(instructorDeliverables);

        if (!instructorDeliverables.data.deliverables) {
          return;
        }

        // Update store with basic info
        dispatch(
          deliverableRefreshStore(instructorDeliverables.data.deliverables),
        );

        // Load the rest of the details and update store after
        const deliverablesWithDetails = instructorDeliverables.data.deliverables.map(
          (deliverable: Deliverable) =>
            axios.get(
              `${SERVER_URL}/instructor/deliverables/${deliverable._id}`,
              {
                headers: { authorization: localStorage.getItem('token') },
              },
            ),
        );

        axios.all(deliverablesWithDetails).then(
          axios.spread((...responses: any[]) => {
            const deliverables = responses.map(response => ({
              ...response.data.deliverable,
              student: response.data.student,
            }));
            return dispatch(deliverableRefreshStore(deliverables));
          }),
        );
      } catch (error) {
        handleError(dispatch)(error);
      }
    })();
  };
};

const handleError = (dispatch: Dispatch) => (error: AxiosError) => {
  if (error.response) {
    dispatch(fetchFailed(error.response.data));
  } else if (error.request) {
    dispatch(fetchFailed(error.request));
  } else {
    dispatch(fetchFailed(error.message));
  }
};
