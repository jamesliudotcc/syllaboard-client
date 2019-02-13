import * as React from 'react';
import { Field, InjectedFormProps, reduxForm } from 'redux-form';
import {
  commaListParser,
  renderDatePicker,
  renderDropdown,
  renderTextField,
} from '../../helpers/form_helpers';

import { ID, NewDeliverableInfo } from '../../../Types';

import { createStyles, Theme, WithStyles, withStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';

const styles = (theme: Theme) =>
  createStyles({
    button: {
      margin: '1em auto',
    },
    rightIcon: {
      marginLeft: theme.spacing.unit,
    },
  });

interface OwnProps {
  errorMessage: string;
  cohorts: Array<{ label: string; value: ID }>;
  assignmentId: ID;
}

type Props = OwnProps &
  WithStyles<typeof styles> &
  InjectedFormProps<NewDeliverableInfo, OwnProps>;

class AddDeliverableForm extends React.Component<Props, {}> {
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
      assignmentId: this.props.assignmentId,
      dueDate: new Date(),
      cohortId: this.props.cohorts[0].value,
    });
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <div>
        {this.renderAlert()}
        <form onSubmit={handleSubmit}>
          <Field label="Due Date" name="dueDate" component={renderDatePicker} />

          <Field
            label="Cohort"
            name="cohortId"
            component={renderDropdown}
            options={this.props.cohorts}
          />

          <Button
            variant="contained"
            color="secondary"
            className={this.props.classes.button}
            type="submit"
          >
            Assign 
            <Icon className={this.props.classes.rightIcon}>send</Icon>
          </Button>
        </form>
      </div>
    );
  }
}

const validate = (values: NewDeliverableInfo) => {
  const errors: any = {};

  if (!values.dueDate) {
    errors.dueDate = 'Please enter a due date';
  }

  return errors;
};

export default reduxForm<NewDeliverableInfo, OwnProps>({
  form: 'addDeliverable',
  validate,
})(withStyles(styles)(AddDeliverableForm));
