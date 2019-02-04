import * as React from 'react';
// import { connect } from 'react-redux';
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

// interface StateProps {
//   errorMessage: string;
//   authenticated: boolean;
// }

// interface DispatchProps {
//   // authError: typeof AC.authError;
//   authError: (error: string) => void;
//   // signinUser: (cred: Credentials) => void;
//   signinUser: typeof actions.signinUser;
// }

const mapStateToProps = (state: State) => ({
  authenticated: state.auth.authenticated,
  errorMessage: state.auth.error,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  authError: (error: string) => dispatch(AC.authError(error)),
  signinUser: (cred: Credentials) => actions.signinUser(cred)(dispatch),
});

// Magic happening here
const { propsGeneric, connect } =
  connectedComponentHelper<OwnProps>()(mapStateToProps, mapDispatchToProps);
type ComponentProps = typeof propsGeneric;

// // Use the inferred ComponentProps type as generic type parameter
// class MyComponent extends React.Component<ComponentProps, {}> {
//   // ...
// }

// // type SignInProps = OwnProps & DispatchProps & StateProps;
// type SignInProps = RouteComponentProps<any> & StateProps & DispatchProps & OwnProps;

type props = RouteComponentProps<any> & ComponentProps;

class Signin extends React.Component<props, {}> {

  componentWillUnmount() {
    if (this.props.errorMessage) {
      this.props.authError('null');
    }
  }

  displayRedirectMessages() {
    const location = this.props.location;
    return location.state && <div className="alert alert-danger">{location.state.message}</div>;
  }

  handleSubmit = ({email, password}: Credentials) => {
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


// export default connect<StateProps, DispatchProps, RouteComponentProps<any>>(
// // @ts-ignore
//   mapStateToProps,
//   mapDispatchToProps,
// )(Signin);

// export default typedConnect(mapStateToProps, mapDispatchToProps)(Signin);

// export default connect<StateProps, DispatchProps, RouteComponentProps<any>>
// (mapStateToProps, mapDispatchToProps)(Counter)

// interface OwnProps {
//   componentOwnProp: string;
// }

// function mapStateToProps(state: State) {
//   return {
//     someProperty: state.someProperty
//   };
// }

// function mapDispatchToProps(dispatch) {
//   // ...
// }

// // Magic happening here
// const { propsGeneric, connect } =
//   connectedComponentHelper<OwnProps>()(mapStateToProps, mapDispatchToProps);
// type ComponentProps = typeof propsGeneric;

// // Use the inferred ComponentProps type as generic type parameter
// class MyComponent extends React.Component<ComponentProps, {}> {
//   // ...
// }

// Export the connected component
export default connect(Signin);
