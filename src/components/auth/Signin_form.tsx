import { createStyles, WithStyles, withStyles } from '@material-ui/core';
import { Theme } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import * as React from 'react';
import { Field, InjectedFormProps, reduxForm } from 'redux-form';
import { inlineForm, label } from '../../style/generalStyles';
import { Credentials } from '../../Types';
import { renderTextField } from '../helpers/form_helpers';

const styles = (theme: Theme) =>
  createStyles({
    spaced: {
      margin: '1rem',
    },
    label: label(theme),
    inlineForm: inlineForm(theme),
    centered: {
      textAlign: 'center',
    },
  });

interface OwnProps {
  errorMessage: string;
}

type Props = OwnProps &
  InjectedFormProps<Credentials, OwnProps> &
  WithStyles<typeof styles>;

class SigninForm extends React.Component<Props, {}> {
  renderAlert() {
    if (this.props.errorMessage) {
      return (
        <div className="alert alert-danger">
          <strong>Oops: </strong>
          {this.props.errorMessage}
        </div>
      );
    }
  }

  render() {
    const { handleSubmit, classes } = this.props;

    return (
      <div className={this.props.classes.centered}>
        {this.renderAlert()}
        <Typography variant="h2">Sign In</Typography>
        <h2 className={classes.label}>Enter Info Here</h2>
        <form onSubmit={handleSubmit} className={this.props.classes.inlineForm}>
          <Field
            label="Email"
            name="email"
            component={renderTextField}
            type="text"
          />

          <Field
            label="Password"
            name="password"
            component={renderTextField}
            type="password"
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.spaced}
          >
            Sign In
          </Button>
        </form>
      </div>
    );
  }
}

export default reduxForm<Credentials, OwnProps>({
  form: 'signin',
})(withStyles(styles)(SigninForm));
