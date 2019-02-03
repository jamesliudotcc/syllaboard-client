import * as React from 'react'
import { connect } from 'react-redux'
import SignupForm from './signup_form'
import * as actions from '../../actions'
import { Redirect } from 'react-router-dom'

class Signup extends React.Component<any, any> {

  componentWillUnmount() {
    if (this.props.errorMessage) {
      this.props.authError(null)
    }
  }

  handleSubmit = ({email, password, passwordConfirmation}: any): any => {
    this.props.signupUser({email, password, passwordConfirmation})
  }

  getRedirectPath() {
    const locationState = this.props.location.state
    if (locationState && locationState.from.pathname) {
      return locationState.from.pathname
    } else {
      return '/'
    }
  }

  render() {
    return (this.props.authenticated) ?
      <Redirect to={{
        pathname: this.getRedirectPath(), state: {
          from: this.props.location
        }
      }}/>
      :
      <div>
        {/*
        // @ts-ignore */}
        <SignupForm onSubmit={this.handleSubmit} errorMessage={this.props.errorMessage}/>
      </div>
  }
}

function mapStateToProps(state: any) {
  return {
    authenticated: state.auth.authenticated,
    errorMessage: state.auth.error
  }
}

export default connect(mapStateToProps, actions)(Signup)
