import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Dispatch } from 'redux';
import { signoutUser } from '../../actions/auth';
import { resetAll } from '../../actions/sharedActions';
import { State } from '../../reducers';
import { connectedComponentHelper } from '../../utils/connectedComponent';

const mapStateToProps = (state: State) => ({});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  signoutUser: () => dispatch(signoutUser()),
  resetAll: () => dispatch(resetAll()),
});

const { propsGeneric, connect } = connectedComponentHelper<{}>()(
  mapStateToProps,
  mapDispatchToProps,
);
type ComponentProps = typeof propsGeneric;

type Props = RouteComponentProps<any> & ComponentProps;

class Signout extends React.Component<Props, {}> {
  componentWillMount() {
    this.props.signoutUser();
    this.props.resetAll();
  }

  render() {
    return <div>Bye Bye</div>;
  }
}

export default connect(Signout);
