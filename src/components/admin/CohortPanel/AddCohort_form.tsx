import * as React from 'react';
import { Field, InjectedFormProps, reduxForm } from 'redux-form';
import { renderDatePicker, renderTextField } from '../../helpers/form_helpers';

import { NewCohortInfo } from '../../../Types';

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
}

const findThreeMonthsFrom = (today: Date) => {
  return new Date(today.getFullYear(), today.getMonth(), today.getDate() + 84);
};

const initDate = {
  today: new Date(),
  endDate: findThreeMonthsFrom(new Date()),
};

type Props = OwnProps &
  WithStyles<typeof styles> &
  InjectedFormProps<NewCohortInfo, OwnProps>;

class AddCohortForm extends React.Component<Props, {}> {
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
      startDate: initDate.today,
      endDate: initDate.endDate,
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

          <Field
            label="Campus City"
            name="campus"
            component={renderTextField}
            type="text"
          />

          <Field
            label="Start Date"
            name="startDate"
            component={renderDatePicker}
          />

          <Field label="End Date" name="endDate" component={renderDatePicker} />

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

export default reduxForm<NewCohortInfo, OwnProps>({
  form: 'addCohort',
})(withStyles(styles)(AddCohortForm));
