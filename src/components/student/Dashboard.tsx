import Typography from '@material-ui/core/Typography';
import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Dispatch } from 'redux';
import * as studentActions from '../../actions/student_dashboard';
import { State } from '../../reducers';
import { Deliverable, TurnInDeliverableInfo } from '../../Types';
import { connectedComponentHelper } from '../../utils/connectedComponent';
import Deliverables from './DeliverablePanel/Deliverables';

const mapStateToProps = (state: State) => ({
  message: state.notifications.message,
  errorMessage: state.auth.error,
  ...state.studentDashboard,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  deliverable: {
    toggleTurnInDeliverable: () =>
      dispatch(studentActions.toggleTurnInDeliverable()),
    toggleShowDeliverables: () =>
      dispatch(studentActions.toggleShowDeliverables()),
    getAllDeliverables: () => studentActions.getAllDeliverables()(dispatch),
    updateDeliverable: (deliverable: TurnInDeliverableInfo) =>
      studentActions.updateDeliverable(deliverable)(dispatch),
    selectDeliverable: (deliverable: Deliverable | null) =>
      dispatch(studentActions.deliverableSelect(deliverable)),
  },
});

const { propsGeneric, connect } = connectedComponentHelper<{}>()(
  mapStateToProps,
  mapDispatchToProps,
);
type ComponentProps = typeof propsGeneric;

type Props = RouteComponentProps<any> & ComponentProps;

class StudentDashboard extends React.Component<Props, {}> {
  componentWillMount() {
    this.props.deliverable.getAllDeliverables();
  }

  render() {
    const deliverableData = {
      deliverables: this.props.deliverables,
      selectedDeliverable: this.props.selectedDeliverable,
      errorMessage: this.props.errorMessage,
      showTurnInDeliverable: this.props.showTurnInDeliverable,
      showAllDeliverables: this.props.showAllDeliverables,
      ...this.props.deliverable,
    };

    return (
      <div>
        <Typography variant="h2" align="center">
          Student Dashboard
        </Typography>
        <Deliverables {...deliverableData} />
      </div>
    );
  }
}

export default connect(StudentDashboard);
