import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Dispatch } from 'redux';
import * as adminActions from '../../actions/admin_dashboard';
import { fetchMessage } from '../../actions/notifications';
import { State } from '../../reducers';
import { Cohort, NewCohortInfo } from '../../Types';
import { connectedComponentHelper } from '../../utils/connectedComponent';
import Cohorts from './Cohorts';
import Typography from '@material-ui/core/Typography';

// TODO: create and import ShowAllCohorts, ShowAllInstructors, and ShowAllStudents (the edit and delete functionality for those will live in thos components)

const mapStateToProps = (state: State) => ({
  message: state.notifications.message,
  errorMessage: state.auth.error,
  ...state.adminDashboard,
  cohorts: state.adminDashboard.cohorts
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchMessage: () => fetchMessage()(dispatch),
  cohort: {
    // Cohort actions
    toggleAddCohort: () => dispatch(adminActions.toggleAddCohort()),
    addNewCohort: (cohortInfo: NewCohortInfo) =>
      adminActions.addNewCohort(cohortInfo)(dispatch),
    getAllCohorts: () => adminActions.getAllCohorts()(dispatch),
    removeCohort: (cohort: Cohort) => adminActions.removeCohort(cohort)(dispatch)
  },
  instructors: {

  },
  students: {

  },
  toggleSendRegistration: () => dispatch(adminActions.toggleSendRegistration()),
  toggleEditUser: () => dispatch(adminActions.toggleEditUser()),
});

const { propsGeneric, connect } = connectedComponentHelper<{}>()(mapStateToProps, mapDispatchToProps);
type ComponentProps = typeof propsGeneric;

type Props = RouteComponentProps<any> & ComponentProps;

class AdminDashboard extends React.Component<Props, {}> {

  componentWillMount() {
    this.props.fetchMessage();
    this.props.cohort.getAllCohorts();
  }

  render() {                                    
    const cohortData = {
      cohorts: this.props.cohorts,
      errorMessage: this.props.errorMessage,
      showAddCohort: this.props.showAddCohort, 
      ...this.props.cohort,
    }

    return (
      <div>
        <Typography variant="h2" align="center">Admin Dashboard</Typography>
        <Cohorts {...cohortData} />
      </div>
    );
  }
}

export default connect(AdminDashboard);
