import Typography from '@material-ui/core/Typography';
import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Dispatch } from 'redux';
import * as instructorActions from '../../actions/instructor_dashboard';
import { State } from '../../reducers';
import {
  Assignment,
  Cohort,
  Deliverable,
  GradeDeliverableInfo,
  NewAssignmentInfo,
  NewDeliverableInfo,
} from '../../Types';
import { connectedComponentHelper } from '../../utils/connectedComponent';
import Assignments from './AssignmentPanel/Assignments';
import Cohorts from './CohortPanel/Cohorts';
import Deliverables from './DeliverablePanel/Deliverables';

const mapStateToProps = (state: State) => ({
  message: state.notifications.message,
  errorMessage: state.auth.error,
  ...state.instructorDashboard,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  getAllAssignments: () => instructorActions.getAllAssignments()(dispatch),
  getAllCohorts: () => instructorActions.getAllCohorts()(dispatch),
  getAllDeliverables: () => instructorActions.getAllDeliverables()(dispatch),
  cohort: {
    toggleShowCohorts: () => dispatch(instructorActions.toggleShowCohorts()),
  },
  assignment: {
    selectAssignment: (assignment: Assignment | null) =>
      dispatch(instructorActions.assignmentSelect(assignment)),
    toggleAddAssignment: () =>
      dispatch(instructorActions.toggleAddAssignment()),
    toggleEditAssignment: () =>
      dispatch(instructorActions.toggleEditAssignment()),
    toggleShowAssignments: () =>
      dispatch(instructorActions.toggleShowAssignments()),
    addNewAssignment: (assignmentInfo: NewAssignmentInfo) =>
      instructorActions.addNewAssignment(assignmentInfo)(dispatch),
    updateAssignment: (assignment: Assignment) =>
      instructorActions.updateAssignment(assignment)(dispatch),
    removeAssignment: (assignment: Assignment) =>
      instructorActions.removeAssignment(assignment)(dispatch),
    addNewDeliverable: (deliverableInfo: NewDeliverableInfo) =>
      instructorActions.addNewDeliverable(deliverableInfo)(dispatch),
    toggleAddDeliverable: () =>
      dispatch(instructorActions.toggleAddDeliverable()),
  },
  deliverable: {
    selectDeliverable: (deliverable: Deliverable | null) =>
      dispatch(instructorActions.deliverableSelect(deliverable)),
    toggleAddDeliverable: () =>
      dispatch(instructorActions.toggleAddDeliverable()),
    toggleGradeDeliverable: () =>
      dispatch(instructorActions.toggleGradeDeliverable()),
    toggleShowDeliverables: () =>
      dispatch(instructorActions.toggleShowDeliverables()),
    addNewDeliverable: (deliverableInfo: NewDeliverableInfo) =>
      instructorActions.addNewDeliverable(deliverableInfo)(dispatch),
    gradeDeliverable: (deliverable: GradeDeliverableInfo) =>
      instructorActions.gradeDeliverable(deliverable)(dispatch),
    removeDeliverable: (deliverable: Deliverable) =>
      instructorActions.removeDeliverable(deliverable)(dispatch),
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
    this.props.getAllAssignments();
    this.props.getAllCohorts();
    this.props.getAllDeliverables();
  }

  render() {
    const cohortData = {
      cohorts: this.props.cohorts,
      errorMessage: this.props.errorMessage,
      showAllCohorts: this.props.showAllCohorts,
      ...this.props.cohort,
    };
    const assignmentData = {
      assignments: this.props.assignments,
      cohortInfo: this.props.cohorts.map((cohort: Cohort) => ({
        label: cohort.name,
        value: cohort._id,
      })),
      errorMessage: this.props.errorMessage,
      showAddAssignment: this.props.showAddAssignment,
      showAllAssignments: this.props.showAllAssignments,
      showEditAssignment: this.props.showEditAssignment,
      selectedAssignment: this.props.selectedAssignment,
      showAddDeliverable: this.props.showAddDeliverable,
      ...this.props.assignment,
    };
    const deliverableData = {
      deliverables: this.props.deliverables,
      errorMessage: this.props.errorMessage,
      showAllDeliverables: this.props.showAllDeliverables,
      showGradeDeliverable: this.props.showGradeDeliverable,
      selectedDeliverable: this.props.selectedDeliverable,
      ...this.props.deliverable,
    };

    return (
      <div>
        <Typography variant="h2" align="center">
          Instructor Dashboard
        </Typography>
        <Cohorts {...cohortData} />
        <Assignments {...assignmentData} />
        <Deliverables {...deliverableData} />
      </div>
    );
  }
}

export default connect(InstructorDashboard);
