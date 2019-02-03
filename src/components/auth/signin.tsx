import * as React from 'react'
import SigninForm from './signin_form'
import * as actions from '../../actions'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

class Signin extends React.Component<any, any> {

  componentWillUnmount() {
    if (this.props.errorMessage) {
      this.props.authError(null)
    }
  }

  displayRedirectMessages() {
    const location = this.props.location
    return location.state && <div className="alert alert-danger">{location.state.message}</div>
  }

  handleSubmit = ({email, password}: any) => {
    this.props.signinUser({email, password})
  }

  getRedirectPath() {
    const locationState = this.props.location.state
    if (locationState && locationState.from.pathname) {
      return locationState.from.pathname // redirects to referring url
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
        {this.displayRedirectMessages()}
        {/*
        // @ts-ignore */}
        <SigninForm onSubmit={this.handleSubmit} errorMessage={this.props.errorMessage}/>
      </div>
  }
}

function mapStateToProps(state: any) {
  return {
    authenticated: state.auth.authenticated,
    errorMessage: state.auth.error
  }
}

export default connect(mapStateToProps, actions)(Signin)