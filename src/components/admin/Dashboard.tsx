import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Dispatch } from 'redux';
import * as adminActions from '../../actions/admin_dashboard';
import { addNewCohort } from '../../actions/cohort';
import { fetchMessage } from '../../actions/notifications';
import { State } from '../../reducers';
import { NewCohortInfo } from '../../Types';
import { connectedComponentHelper } from '../../utils/connectedComponent';
import AddCohortForm from './AddCohort_form';

// TODO: create and import ShowAllCohorts, ShowAllInstructors, and ShowAllStudents (the edit and delete functionality for those will live in thos components)

const mapStateToProps = (state: State) => ({
  message: state.notifications.message,
  errorMessage: state.auth.error,
  ...state.adminDashboard,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchMessage: () => fetchMessage()(dispatch),
  toggleAddCohort: () => dispatch(adminActions.toggleAddCohort()),
  toggleSendRegistration: () => dispatch(adminActions.toggleSendRegistration()),
  toggleEditUser: () => dispatch(adminActions.toggleEditUser()),
  // Cohort actions
  addNewCohort: (cohortInfo: NewCohortInfo) =>
    addNewCohort(cohortInfo)(dispatch),
});

const { propsGeneric, connect } = connectedComponentHelper<{}>()(mapStateToProps, mapDispatchToProps);
type ComponentProps = typeof propsGeneric;

type Props = RouteComponentProps<any> & ComponentProps;

class AdminDashboard extends React.Component<Props, {}> {

  componentWillMount() {
    this.props.fetchMessage();
  }

  handleSubmit = (input: NewCohortInfo) => {
    this.props.addNewCohort(input);
  };

  render() {
    const addCohortPanel = this.props.showAddCohort
      ?
        <div>
          <AddCohortForm
            onSubmit={this.handleSubmit}
            errorMessage={this.props.errorMessage}
          />
        </div>
      :
        <div></div>;                                     

    return (
      <div>
        <p><strong>ADMIN DASHBOARD</strong></p>
        <br/>
        <button onClick={this.props.toggleAddCohort}>+</button>
        {addCohortPanel}

        <p>Here's a secret response from the server that your token returned:</p>
        ____________________________________________________________
        <p>{this.props.message}</p>
        ____________________________________________________________
        <br/>
        <p>Notice that clicking these links redirect to the homepage, as you are already signed in:</p>
      </div>
    );
  }
}

export default connect(AdminDashboard);
