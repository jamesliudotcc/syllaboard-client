import * as React from 'react';

import { RouteComponentProps } from 'react-router';
import { connectedComponentHelper } from './utils/connectedComponent';
import { State } from './reducers';
import { Dispatch } from 'redux';
import { Credentials } from '../../Types';
import * as actions from '../../actions';

interface OwnProps {
  test: string;
}

const mapStateToProps = (state: State) => ({
  authenticated: state.auth.authenticated,
  errorMessage: state.auth.error,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  authError: (error: string) => dispatch(AC.authError(error)),
  signinUser: (cred: Credentials) => actions.signinUser(cred)(dispatch),
});

// Magic happening here
// Use helper function to attach redux state/dispatch types to OwnProps
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
        Useful things go here
      </div>
    );
  }
}

// !! this connect is not the default. It is defined above using helper function
export default connect(MyComponent);
