import * as React from 'react';
import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import { State } from '../../reducers';

export const ProtectedRoute = ({
  component: ComposedComponent,
  role,
  ...rest
}: any) => {
  class Authentication extends React.Component<any, any> {
    // redirect if not authenticated; otherwise, return the component imputted into <PrivateRoute />
    handleRender = (props: any) => {
      if (!this.props.authenticated) {
        return (
          <Redirect
            to={{
              pathname: '/signin',
              state: {
                from: props.location,
                message: 'You need to sign in',
              },
            }}
          />
        );
      }
      if (this.props.role !== role) {
        return (
          <Redirect
            to={{
              pathname: '/',
              state: {
                from: props.location,
                message: 'You are not authorized',
              },
            }}
          />
        );
      }
      return <ComposedComponent {...props} />;
    };

    render() {
      return <Route {...rest} render={this.handleRender} />;
    }
  }

  const mapStateToProps = (state: State) => ({
    authenticated: state.auth.authenticated,
    role: state.auth.role,
  });

  const AuthenticationContainer = connect(mapStateToProps)(Authentication);
  return <AuthenticationContainer />;
};
