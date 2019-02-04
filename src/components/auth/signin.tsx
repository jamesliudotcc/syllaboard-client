import * as React from 'react';
import { Redirect } from 'react-router-dom';
import * as actions from '../../actions';
import SigninForm from './signin_form';


import * as AC from '../../actions/creators';

import { Dispatch } from 'redux';
import { DispatchPropTypes } from '../../actions';
import { State } from '../../reducers';

import { RouteComponentProps } from 'react-router';
import { Credentials } from '../../Types';

import { connectedComponentHelper } from '../../utils/connectedComponent';

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

const { propsGeneric, connect } =
  connectedComponentHelper<OwnProps>()(mapStateToProps, mapDispatchToProps);
type ComponentProps = typeof propsGeneric;

type Props = RouteComponentProps<any> & ComponentProps;

class Signin extends React.Component<Props, {}> {

  componentWillUnmount() {
    if (this.props.errorMessage) {
      this.props.authError('null');
    }
  }

  displayRedirectMessages() {
    const location = this.props.location;
    return location.state && <div className="alert alert-danger">{location.state.message}</div>;
  }

  handleSubmit = ({email, password}: any) => {
    this.props.signinUser({email, password});
  }

  getRedirectPath() {
    const locationState = this.props.location.state;
    if (locationState && locationState.from.pathname) {
      return locationState.from.pathname; // redirects to referring url
    } else {
      return '/';
    }
  }

  render() {
    return (this.props.authenticated) ?
      <Redirect to={{
        pathname: this.getRedirectPath(), state: {
          from: this.props.location,
        },
      }}/>
      :
      <div>
        {this.displayRedirectMessages()}
        {/*
        //@ts-ignore */}
        <SigninForm onSubmit={this.handleSubmit} errorMessage={this.props.errorMessage}/>
      </div>;
  }
}

export default connect(Signin);
