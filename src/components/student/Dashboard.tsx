import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Dispatch } from 'redux';
import { fetchMessage } from '../../actions/notifications';
import * as studentActions from '../../actions/student_dashboard';
import { State } from '../../reducers';
import { connectedComponentHelper } from '../../utils/connectedComponent';
import Deliverables from './DeliverablePanel/Deliverables';


// TODO: add all needed state/dispatch to props
const mapStateToProps = (state: State) => ({
  message: state.notifications.message,
  errorMessage: state.auth.error,
  ...state.studentDashboard,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchMessage: () => fetchMessage()(dispatch),
  toggleTurnInDeliverable: () => dispatch(studentActions.toggleTurnInDeliverable()),
});

const { propsGeneric, connect } = connectedComponentHelper<{}>()(mapStateToProps, mapDispatchToProps);
type ComponentProps = typeof propsGeneric;

type Props = RouteComponentProps<any> & ComponentProps;

class StudentDashboard extends React.Component<Props, {}> {

  componentWillMount() {
    this.props.fetchMessage();
  }

  render() {
    const turnInDeliverablePanel = this.props.showTurnInDeliverable
      ?
        <div>
          {/* TODO: Add turn in deliverable component */}
          Turn in Deliverable Component goes here!
        </div>
      :
        <div></div>;                                     

    return (
      <div>
        <p><strong>STUDENT DASHBOARD</strong></p>
        <br/>

        <button onClick={this.props.toggleTurnInDeliverable}>+</button>
        {turnInDeliverablePanel}


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

export default connect(StudentDashboard);
