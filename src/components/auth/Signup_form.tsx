import * as React from 'react';
import { Field, InjectedFormProps, reduxForm } from 'redux-form';
import { SignUpInfo } from '../../Types';
import { renderTextField } from '../helpers/form_helpers';
import { inlineForm } from '../../style/generalStyles';

// Material UI
import Button from '@material-ui/core/Button';
import { createStyles, Theme, WithStyles, withStyles } from '@material-ui/core';


const styles = (theme: Theme) => createStyles({
  button: {
    marginTop: '2em',
  },
  inlineForm: inlineForm(theme),
})

interface OwnProps {
  errorMessage: string;
  cohortKey: string;
}

type Props = OwnProps & WithStyles<typeof styles> & InjectedFormProps<SignUpInfo, OwnProps>;

class SignupForm extends React.Component<Props, {}> {

  componentWillMount () {
    this.props.initialize({
      cohortKey: this.props.cohortKey,
    });
  }

  renderAlert() {
    if (this.props.errorMessage) {
      return <div className="alert alert-danger">
        <strong>Oops: </strong>{this.props.errorMessage}
      </div>;
    }
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <div>
        {this.renderAlert()}
        <form onSubmit={handleSubmit} className={this.props.classes.inlineForm}>

          <Field
            label="First Name"
            name="firstName"
            component={renderTextField}
            type="text"/>

          <Field
            label="Last Name"
            name="lastName"
            component={renderTextField}
            type="text"/>

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

          <Field
            label="Cohort Key"
            name="cohortKey"
            component={renderTextField}
            type="text"/>

          <Button type="submit" variant="contained" color="primary">
            Sign Up
          </Button>
        </form>
      </div>
    );
  }
}

const validate = (values: SignUpInfo) => {
  const errors: any = {};

  if (!values.firstName) {
    errors.firstName = 'Please enter a first name';
  }

  if (!values.lastName) {
    errors.lastName = 'Please enter a last name';
  }

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

  if (!values.cohortKey) {
    errors.cohortKey = 'Please enter the cohort key sent to you';
  }

  return errors;
};

export default reduxForm<SignUpInfo, OwnProps>({
  form: 'signup',
  validate,
})(withStyles(styles)(SignupForm));
