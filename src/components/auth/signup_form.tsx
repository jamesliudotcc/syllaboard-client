import * as React from 'react';
import { Field, reduxForm } from 'redux-form';
// import RaisedButton from 'material-ui/RaisedButton'
import { renderTextField } from './form_helpers';

class SignupForm extends React.Component<any, any> {

  renderAlert() {
    if (this.props.errorMessage) {
      return <div className="alert alert-danger">
        <strong>Oops: </strong>{this.props.errorMessage}
      </div>;
    }
  }

  render() {
    const {handleSubmit} = this.props;

    return (
      <div>
        {this.renderAlert()}
        <form onSubmit={handleSubmit}>

          <Field
            label="Email"
            name="email"
            component={renderTextField}
            type="text"/>

          <Field
            label="Password"
            name="password"
            component={renderTextField}
            type="password"/>

          <Field
            label="Password Confirmation"
            name="passwordConfirmation"
            component={renderTextField}
            type="password"/>

          {/* <RaisedButton type="submit" label="Sign Up" primary={true} labelColor={'#FFFFFF'}/> */}
          <button type="submit">Sign Up</button>
        </form>
      </div>
    );
  }
}

const validate = (values: any) => {
  const errors: any = {};

  if (values.password !== values.passwordConfirmation) {
    errors.password = 'Passwords must match';
  }

  if (!values.email) {
    errors.email = 'Please enter an email';
  }

  if (!values.password) {
    errors.password = 'Please enter a password';
  }

  if (!values.passwordConfirmation) {
    errors.passwordConfirmation = 'Please confirm your password';
  }

  return errors;
};

export default reduxForm({
  form: 'signup',
  validate,
})(SignupForm);
