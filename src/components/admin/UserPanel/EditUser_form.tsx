import * as React from 'react';
import { Field, InjectedFormProps, reduxForm } from 'redux-form';
import { roleOptions, User } from '../../../Types';
import { renderDropdown } from '../../helpers/form_helpers';

// Material UI
import { createStyles, Theme, WithStyles, withStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';

const styles = (theme: Theme) =>
  createStyles({
    button: {
      marginTop: '2em',
    },
    rightIcon: {
      marginLeft: theme.spacing.unit,
    },
  });

interface OwnProps {
  errorMessage: string;
  user: User;
}

type Props = OwnProps &
  WithStyles<typeof styles> &
  InjectedFormProps<User, OwnProps>;

class EditUserForm extends React.Component<Props, {}> {
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

  componentWillMount() {
    this.props.initialize({
      ...this.props.user,
    });
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <div>
        {this.renderAlert()}
        <form onSubmit={handleSubmit}>
          <Field
            label="Role"
            name="role"
            component={renderDropdown}
            options={roleOptions}
          />

          <Button
            variant="contained"
            color="secondary"
            className={this.props.classes.button}
            type="submit"
          >
            Edit
            <Icon className={this.props.classes.rightIcon}>send</Icon>
          </Button>
        </form>
      </div>
    );
  }
}

export default reduxForm<User, OwnProps>({
  form: 'editUser',
})(withStyles(styles)(EditUserForm));
