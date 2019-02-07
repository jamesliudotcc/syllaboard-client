import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Dispatch } from 'redux';
import { fetchMessage } from '../../actions/notifications';
import { State } from '../../reducers';
import { connectedComponentHelper } from '../../utils/connectedComponent';

import * as adminActions from '../../actions/admin_dashboard';

import AddCohort from './AddCohort';

const mapStateToProps = (state: State) => ({
  message: state.notifications.message,
  ...state.adminDashboard,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchMessage: () => fetchMessage()(dispatch),
  toggleAddCohort: () => dispatch(adminActions.toggleAddCohort()),
  toggleSendRegistration: () => dispatch(adminActions.toggleSendRegistration()),
  toggleEditUser: () => dispatch(adminActions.toggleEditUser()),
});

const { propsGeneric, connect } = connectedComponentHelper<{}>()(mapStateToProps, mapDispatchToProps);
type ComponentProps = typeof propsGeneric;

type Props = RouteComponentProps<any> & ComponentProps;

class AdminDashboard extends React.Component<Props, {}> {

  componentWillMount() {
    this.props.fetchMessage();
  }

  render() {
    const addCohortPanel = this.props.showAddCohort
      ?
        <div>Add Cohort From goes here</div>
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
