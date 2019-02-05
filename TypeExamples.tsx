import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Dispatch } from 'redux';
import * as actions from './src/actions';
import * as AC from './src/actions/creators';
import { State } from './src/reducers';
import { Credentials } from './src/Types';
import { connectedComponentHelper } from './src/utils/connectedComponent';

// Define props specific to component if needed
interface OwnProps {
  test: string;
}

// Define props from Redux state
const mapStateToProps = (state: State) => ({
  authenticated: state.auth.authenticated,
  errorMessage: state.auth.error,
});

// Define actions from redux actions
const mapDispatchToProps = (dispatch: Dispatch) => ({
  authError: (error: string) => dispatch(AC.authError(error)),
  signinUser: (cred: Credentials) => actions.signinUser(cred)(dispatch),
});

// Magic happening here
// Use helper function to attach redux state/dispatch types to OwnProps
// Replace OwnProps with {} if component doesn't have it's own props
const { propsGeneric, connect } =
  connectedComponentHelper<OwnProps>()(mapStateToProps, mapDispatchToProps);
type ReduxProps = typeof propsGeneric;

// Compoenent props need to inherit from Route and Redux to access
// location and state derived props
type ComponentProps = RouteComponentProps<any> & ReduxProps;

// Define component
class MyComponent extends React.Component<ComponentProps, {}> {
  render() {
    return (
      <div>
        {this.props.location}
      </div>
    );
  }
}

// !! this connect is not the default. It is defined above using helper function
export default connect(MyComponent);
