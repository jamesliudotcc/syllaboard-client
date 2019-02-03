import * as React from 'react'
import { reduxForm, Field, InjectedFormProps } from 'redux-form'
import { renderTextField } from './form_helpers'
// import RaisedButton from 'material-ui/RaisedButton'


class SigninForm extends React.Component<any, any> {

  renderAlert() {
    // if (this.props.errorMessage) {
    //   return <div className="alert alert-danger">
    //     <strong>Oops: </strong>{this.props.errorMessage}
    //   </div>
    // }
  }

  render() {
    const {handleSubmit} = this.props;
    // const {onSubmit} = this.props;

    return (
      <div>
        {this.renderAlert()}
        <form onSubmit={handleSubmit}>
        {/* <form onSubmit={onSubmit}> */}

          <Field
            label="Username"
            name="email"
            component={renderTextField}
            type="text"/>

          <Field
            label="Password"
            name="password"
            component={renderTextField}
            type="password"/>

          {/* <RaisedButton type="submit" label="Sign In" primary={true} labelColor={'#FFFFFF'}/> */}
          <button type="submit">Sign In</button>
        </form>
      </div>
    )
  }
}

export default reduxForm({
  form: 'signin'
})(SigninForm)
