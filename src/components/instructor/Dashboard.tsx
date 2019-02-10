import Typography from '@material-ui/core/Typography';
import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Dispatch } from 'redux';
import * as instructorActions from '../../actions/instructor_dashboard';
import { fetchMessage } from '../../actions/notifications';
import { State } from '../../reducers';
import { Cohort, NewCohortInfo, User } from '../../Types';
import { connectedComponentHelper } from '../../utils/connectedComponent';


const mapStateToProps = (state: State) => ({
  message: state.notifications.message,
  errorMessage: state.auth.error,
  ...state.instructorDashboard,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchMessage: () => fetchMessage()(dispatch),
  getAllCohorts: () => instructorActions.getAllCohorts()(dispatch),
  // cohort: {
  //   toggleShowCohorts: () => dispatch(instructorActions.toggleShowCohorts()),
  //   updateCohort: (cohort: Cohort) => instructorActions.updateCohort(cohort)(dispatch),
  //   selectCohort: (cohort: Cohort | null) => dispatch(instructorActions.cohortSelect(cohort)),
  // },
  assignment: {
    toggleAddAssignment: () => dispatch(instructorActions.toggleAddAssignment()),
  },
  deliverable: {
    toggleAddDeliverable: () => dispatch(instructorActions.toggleAddDeliverable()),
  },
});

const { propsGeneric, connect } = connectedComponentHelper<{}>()(mapStateToProps, mapDispatchToProps);
type ComponentProps = typeof propsGeneric;

type Props = RouteComponentProps<any> & ComponentProps;

class InstructorDashboard extends React.Component<Props, {}> {

  componentWillMount() {
    this.props.fetchMessage();
    this.props.getAllCohorts();
  }

  render() {
    const addAssignmentPanel = this.props.showAddAssignment
      ?
        <div>
          {/* TODO: Add 'add assignment' component */}
          Add Assignment Component Goes Here!
        </div>
      :
        <div></div>;                                     

    const addDeliverablePanel = this.props.showAddDeliverable
      ?
        <div>
          {/* TODO: Add 'add deliverable' component */}
          Add Deliverable Component Goes Here!
        </div>
      :
        <div></div>;                                     
    
    // TODO: remove this after testing  vvvvvvv
    const flatten = (arr: any[]): any[] => (
      arr.reduce((flat, toFlatten) => (
        flat.concat(Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten)
      ), [])
    );
    
    const cohort = this.props.cohorts.length >= 1
      ?
        flatten(this.props.cohorts.map((c, i) => (
          c.students.map((student: User) => (
            <p key={student._id}>{student.firstName}</p>
          )))))
      :
        <div>Loading...</div>;
    // TODO: remove after testing ^^^^^^^
    
    

    return (
      <div>
        <p><strong>INSTRUCTOR DASHBOARD</strong></p>
        <br/>

        <button onClick={this.props.assignment.toggleAddAssignment}>+</button>
        {addAssignmentPanel}

        <button onClick={this.props.deliverable.toggleAddDeliverable}>+</button>
        {addDeliverablePanel}

        ____________________________________________________________
        Cohort:
        {cohort}
        ____________________________________________________________
        <br/>
        <p>Notice that clicking these links redirect to the homepage, as you are already signed in:</p>
      </div>
    );
  }
}

export default connect(InstructorDashboard);
