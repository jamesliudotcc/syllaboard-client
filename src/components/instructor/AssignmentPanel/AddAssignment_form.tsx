import * as React from 'react';
import { Field, InjectedFormProps, reduxForm } from 'redux-form';
import { NewAssignmentInfo } from '../../../Types';
import { commaListParser, renderTextField } from '../../helpers/form_helpers';

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
}

type Props = OwnProps &
  WithStyles<typeof styles> &
  InjectedFormProps<NewAssignmentInfo, OwnProps>;

class AddAssignmentForm extends React.Component<Props, {}> {
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

          <Field
            label="Cohort Type"
            name="cohortType"
            component={renderTextField}
            type="text"
          />

          <Field
            label="Cohort Week"
            name="cohortWeek"
            component={renderTextField}
            type="number"
          />

          <Field
            label="Instructions"
            name="instructions"
            component={renderTextField}
            type="text"
            multiline={true}
          />

          <Field
            label="Resources"
            name="resourcesUrls"
            component={renderTextField}
            type="text"
          />

          <Button
            variant="contained"
            color="secondary"
            className={this.props.classes.button}
            type="submit"
          >
            Add
            <Icon className={this.props.classes.rightIcon}>send</Icon>
          </Button>
        </form>
      </div>
    );
  }
}

const validate = (values: NewAssignmentInfo) => {
  const errors: any = {};

  if (!values.name) {
    errors.name = 'Please enter a name for the assignment';
  }

  // Parse list and if no value then flag error
  if (values.cohortType) {
    if (commaListParser(values.cohortType).join('').length < 1) {
      errors.cohortType = 'Please enter a comma separated list. Ex. WDI,UX';
    }
  }

  if (!values.cohortWeek) {
    errors.cohortWeek = 'Please enter the estimated week for the assignment';
  }

  if (!values.instructions) {
    errors.instructions = 'Please enter some instructions';
  }

  // Parse list and if no value then flag error
  if (values.resourcesUrls) {
    if (commaListParser(values.resourcesUrls).join('').length < 1) {
      errors.resourcesUrls = 'Please enter a comma separated list of urls';
    }
  }

  return errors;
};

export default reduxForm<NewAssignmentInfo, OwnProps>({
  form: 'addAssignment',
  validate,
})(withStyles(styles)(AddAssignmentForm));
