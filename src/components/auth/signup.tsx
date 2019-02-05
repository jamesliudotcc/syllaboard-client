import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Redirect } from 'react-router-dom';
import { Dispatch } from 'redux';
import * as actions from '../../actions';
import * as AC from '../../actions/creators';
import { State } from '../../reducers';
import { Credentials } from '../../Types';
import { connectedComponentHelper } from '../../utils/connectedComponent';
import SignupForm from './Signup_form';

const mapStateToProps = (state: State) => ({
  authenticated: state.auth.authenticated,
  errorMessage: state.auth.error,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  authError: (error: string) => dispatch(AC.authError(error)),
  signupUser: (cred: Credentials) => actions.signupUser(cred)(dispatch),
});

const { propsGeneric, connect } = connectedComponentHelper<{}>()(
  mapStateToProps,
  mapDispatchToProps,
);
type ComponentProps = typeof propsGeneric;

type Props = RouteComponentProps<any> & ComponentProps;

class Signup extends React.Component<Props, {}> {
  componentWillUnmount() {
    if (this.props.errorMessage) {
      this.props.authError('');
    }
  }

  handleSubmit = ({ email, password, passwordConfirmation }: any): any => {
    this.props.signupUser({ email, password, passwordConfirmation });
  };

  getRedirectPath() {
    const locationState = this.props.location.state;
    if (locationState && locationState.from.pathname) {
      return locationState.from.pathname;
    } else {
      return '/';
    }
  }

  render() {
    return this.props.authenticated ? (
      <Redirect
        to={{
          pathname: this.getRedirectPath(),
          state: {
            from: this.props.location,
          },
        }}
      />
    ) : (
      <div>
        <SignupForm
          onSubmit={this.handleSubmit}
          errorMessage={this.props.errorMessage}
        />
      </div>
    );
  }
}

export default connect(Signup);
