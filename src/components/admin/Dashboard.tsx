import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Dispatch } from 'redux';
import * as adminActions from '../../actions/admin_dashboard';
import { addNewCohort } from '../../actions/cohort';
import { fetchMessage } from '../../actions/notifications';
import { State } from '../../reducers';
import { NewCohortInfo, Cohort } from '../../Types';
import { connectedComponentHelper } from '../../utils/connectedComponent';
import Cohorts from './Cohorts';

// TODO: create and import ShowAllCohorts, ShowAllInstructors, and ShowAllStudents (the edit and delete functionality for those will live in thos components)

const mapStateToProps = (state: State) => ({
  message: state.notifications.message,
  errorMessage: state.auth.error,
  ...state.adminDashboard,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchMessage: () => fetchMessage()(dispatch),
  cohort: {
    // Cohort actions
    toggleAddCohort: () => dispatch(adminActions.toggleAddCohort()),
    addNewCohort: (cohortInfo: NewCohortInfo) =>
      addNewCohort(cohortInfo)(dispatch),
  },
  instructors: {

  },
  students: {

  },
  toggleSendRegistration: () => dispatch(adminActions.toggleSendRegistration()),
  toggleEditUser: () => dispatch(adminActions.toggleEditUser()),
});

const dummyCohorts: Cohort[] = [
  {
    name: 'WDI-22',
    campus: 'Seattle',
    students: [],
    instructors: [],
    startDate: new Date('2018-11-26T22:06:00.000Z'),
    endDate: new Date('2019-03-01T22:06:00.000Z')
  }, {
    name: 'UXDI-27',
    campus: 'Seattle',
    students: [],
    instructors: [],
    startDate: new Date('2019-01-T22:06:00.000Z'),
    endDate: new Date('2019-03-01T22:06:00.000Z')
  }
]

const { propsGeneric, connect } = connectedComponentHelper<{}>()(mapStateToProps, mapDispatchToProps);
type ComponentProps = typeof propsGeneric;

type Props = RouteComponentProps<any> & ComponentProps;

class AdminDashboard extends React.Component<Props, {}> {

  componentWillMount() {
    this.props.fetchMessage();
  }

  render() {                                    
    const cohortData = {
      cohorts: dummyCohorts,
      errorMessage: this.props.errorMessage,
      showAddCohort: this.props.showAddCohort, 
      ...this.props.cohort,
    }

    return (
      <div>
        <p><strong>ADMIN DASHBOARD</strong></p>
        <Cohorts {...cohortData} />
      </div>
    );
  }
}

export default connect(AdminDashboard);
