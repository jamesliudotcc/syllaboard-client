import * as React from 'react';
import { createStyles, Theme, WithStyles, withStyles } from '@material-ui/core';
import { Field, InjectedFormProps, reduxForm } from 'redux-form';
import { Cohort } from '../../../Types';
import { renderDropdown, renderTextField, renderDatePicker } from '../../helpers/form_helpers';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';

const styles = (theme: Theme) => createStyles({
  button: {
    margin: theme.spacing.unit,
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
})

interface OwnProps {
  errorMessage: string;
  cohort: Cohort;
}

type Props = OwnProps & WithStyles<typeof styles> & InjectedFormProps<Cohort, OwnProps>;

class EditCohortForm extends React.Component<Props, {}> {
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
      ...this.props.cohort,
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
            value={this.props.cohort.name}
          />

          <Field
            label="Campus City"
            name="campus"
            component={renderTextField}
            type="text"
            value={this.props.cohort.campus}
          />

          <Field
            label="Start Date"
            name="startDate"
            component={renderDatePicker}
            value={this.props.cohort.startDate}
          />

          <Field
            label="End Date"
            name="endDate"
            component={renderDatePicker}
            value={this.props.cohort.endDate}
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

export default reduxForm<Cohort, OwnProps>({
  form: 'editCohort',
})(withStyles(styles)(EditCohortForm));
