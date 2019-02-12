import * as React from 'react';
import { Field, InjectedFormProps, reduxForm } from 'redux-form';
import { Deliverable } from '../../../Types';
import { renderTextField } from '../../helpers/form_helpers';

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
  deliverable: Deliverable;
}

type Props = OwnProps &
  WithStyles<typeof styles> &
  InjectedFormProps<Deliverable, OwnProps>;

class EditDeliverableForm extends React.Component<Props, {}> {
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
      ...this.props.deliverable,
    });
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <div>
        {this.renderAlert()}
        <form onSubmit={handleSubmit}>
          <Field
            label="Name"
            name="name"
            component={renderTextField}
            type="text"
          />

          <button type="submit">Edit</button>
        </form>
      </div>
    );
  }
}

export default reduxForm<Deliverable, OwnProps>({
  form: 'editDeliverable',
})(withStyles(styles)(EditDeliverableForm));
