import * as React from 'react';
import { Field, InjectedFormProps, reduxForm } from 'redux-form';
import { renderTextField } from '../helpers/form_helpers';

import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography';



import { Credentials } from '../../Types';

import { createStyles, WithStyles, withStyles } from '@material-ui/core';
import { Theme } from '@material-ui/core';

import { label } from '../../style/generalStyles';

const styles = (theme: Theme) => createStyles({
  spaced: {
    margin: '1rem',
  },
  label: label(theme),
});

interface OwnProps {
  errorMessage: string;
}

type Props = OwnProps & InjectedFormProps<Credentials, OwnProps> & WithStyles<typeof styles>;

class SigninForm extends React.Component<Props, {}> {

  renderAlert() {
    if (this.props.errorMessage) {
      return <div className="alert alert-danger">
        <strong>Oops: </strong>{this.props.errorMessage}
      </div>;
    }
  }

  render() {
    const {handleSubmit, classes} = this.props;

    return (
      <div>
        {this.renderAlert()}
        <Typography variant="h1">Sign In</Typography>
        <h2 className={classes.label}>Enter Info Here</h2> 
        <form onSubmit={handleSubmit}>

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

          <Button type="submit" variant="contained" color="primary" className={classes.spaced}>
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
