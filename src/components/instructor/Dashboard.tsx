import Typography from '@material-ui/core/Typography';
import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Dispatch } from 'redux';
import * as instructorActions from '../../actions/instructor_dashboard';
import { fetchMessage } from '../../actions/notifications';
import { State } from '../../reducers';
import {
  Assignment,
  Deliverable,
  NewAssignmentInfo,
  NewDeliverableInfo,
} from '../../Types';
import { connectedComponentHelper } from '../../utils/connectedComponent';
import Assignments from './AssignmentPanel/Assignments';
import Cohorts from './CohortPanel/Cohorts';
// import Deliverables from "./DeliverablePanel/Deliverables";

const mapStateToProps = (state: State) => ({
  message: state.notifications.message,
  errorMessage: state.auth.error,
  ...state.instructorDashboard,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchMessage: () => fetchMessage()(dispatch),
  cohort: {
    // Cohort actions
    getAllCohorts: () => instructorActions.getAllCohorts()(dispatch)
  },
  assignment: {
    toggleAddAssignment: () =>
      dispatch(instructorActions.toggleAddAssignment()),
    addNewAssignment: (assignmentInfo: NewAssignmentInfo) =>
      instructorActions.addNewAssignment(assignmentInfo)(dispatch),
    updateAssignment: (assignment: Assignment) =>
      instructorActions.updateAssignment(assignment)(dispatch),
    removeAssignment: (assignment: Assignment) =>
      instructorActions.removeAssignment(assignment)(dispatch),
    getAllAssignments: () => instructorActions.getAllAssignments()(dispatch)
  },
  deliverable: {
    toggleAddDeliverable: () =>
      dispatch(instructorActions.toggleAddDeliverable()),
    addNewDeliverable: (deliverableInfo: NewDeliverableInfo) =>
      instructorActions.addNewDeliverable(deliverableInfo)(dispatch),
    updateDeliverable: (deliverable: Deliverable) =>
      instructorActions.updateDeliverable(deliverable)(dispatch),
    removeDeliverable: (deliverable: Deliverable) =>
      instructorActions.removeDeliverable(deliverable)(dispatch),
    getAllDeliverables: () => instructorActions.getAllDeliverables()(dispatch)
  },
});

const { propsGeneric, connect } = connectedComponentHelper<{}>()(
  mapStateToProps,
  mapDispatchToProps,
);
type ComponentProps = typeof propsGeneric;

type Props = RouteComponentProps<any> & ComponentProps;

class InstructorDashboard extends React.Component<Props, {}> {
  componentWillMount() {
    this.props.fetchMessage();
    this.props.assignment.getAllAssignments();
    this.props.cohort.getAllCohorts();
    this.props.deliverable.getAllDeliverables();
  }

  render() {

    const cohortData = {
      cohorts: this.props.cohorts,
      errorMessage: this.props.errorMessage,
      ...this.props.cohort,
    };
    const assignmentData = {
      assignments: this.props.assignment,
      errorMessage: this.props.errorMessage,
      showAddAssignment: this.props.showAddAssignment,
      showAllAssignments: this.props.showAllAssignments,
      showEditAssignment: this.props.showEditAssignment,
      ...this.props.assignment,
    };
    const deliverableData = {
      deliverables: this.props.deliverables,
      showAddDeliverable: this.props.showAddDeliverable,
      errorMessage: this.props.errorMessage,
      ...this.props.deliverable,
    };

    return (
      <div>
        <Typography variant="h2" align="center">
          Instructor Dashboard
        </Typography>
        {/* <Cohorts {...cohortData} /> */}
        <Assignments {...assignmentData} />
        {/* <Deliverable {...deliverableData} /> */}
      </div>
    );
  }
}

export default connect(InstructorDashboard);
