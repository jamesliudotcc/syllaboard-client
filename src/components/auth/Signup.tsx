import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Redirect } from 'react-router-dom';
import { Dispatch } from 'redux';
import { authError, signupUser } from '../../actions/auth';
import { State } from '../../reducers';
import { SignUpInfo } from '../../Types';
import { connectedComponentHelper } from '../../utils/connectedComponent';
import SignupForm from './Signup_form';

const mapStateToProps = (state: State) => ({
  authenticated: state.auth.authenticated,
  role: state.auth.role,
  errorMessage: state.auth.error,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  authError: (error: string) => dispatch(authError(error)),
  signupUser: (cred: SignUpInfo) => signupUser(cred)(dispatch),
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

  handleSubmit = (input: SignUpInfo): void => {
    this.props.signupUser(input);
  };

  getRedirectPath() {
    const locationState = this.props.location.state;
    if (locationState && locationState.from.pathname) {
      return locationState.from.pathname;
    } else {
      return this.props.role ? `/dashboard/${this.props.role}` : '/';
    }
  }

  render() {

    const getKey = () => (
      this.props.match.params.cohortKey ? this.props.match.params.cohortKey : null
    );

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
          cohortKey={getKey()}
        />
      </div>
    );
  }
}

export default connect(Signup);
