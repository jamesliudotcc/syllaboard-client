import * as React from 'react';
import { Field, InjectedFormProps, reduxForm } from 'redux-form';
import { Deliverable, GradeDeliverableInfo } from '../../../Types';
import { renderTextField } from '../../helpers/form_helpers';

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
  deliverable: Deliverable;
}

type Props = OwnProps &
  WithStyles<typeof styles> &
  InjectedFormProps<GradeDeliverableInfo, OwnProps>;

class GradeDeliverableForm extends React.Component<Props, {}> {
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
      deliverableId: this.props.deliverable._id,
    });
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <div>
        {this.renderAlert()}
        <form onSubmit={handleSubmit}>
          <Field
            label="Grade"
            name="grade"
            component={renderTextField}
            type="number"
          />

          <Button
            variant="contained"
            color="secondary"
            className={this.props.classes.button}
            type="submit"
          >
            Grade
            <Icon className={this.props.classes.rightIcon}>edit</Icon>
          </Button>
        </form>
      </div>
    );
  }
}

export default reduxForm<GradeDeliverableInfo, OwnProps>({
  form: 'gradeDeliverable',
})(withStyles(styles)(GradeDeliverableForm));
