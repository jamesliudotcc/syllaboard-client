import * as React from 'react';
import { Field, InjectedFormProps, reduxForm } from 'redux-form';
import { Deliverable, TurnInDeliverableInfo } from '../../../Types';
import { renderTextField } from '../../helpers/form_helpers';

// Material UI
import { createStyles, Theme, WithStyles, withStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';

const styles = (theme: Theme) => createStyles({
  button: {
    margin: '1em auto',
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  }
})

interface OwnProps {
  errorMessage: string;
  deliverable: Deliverable;
}

type Props = OwnProps & WithStyles<typeof styles> & InjectedFormProps<TurnInDeliverableInfo, OwnProps>;

class TurnInDeliverableForm extends React.Component<Props, {}> {
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
      turnedIn: new Date(),
    });
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <div>
        {this.renderAlert()}
        <form onSubmit={handleSubmit}>
          <Field
            label="Deliverable URL"
            name="deliverable"
            component={renderTextField}
            type="text"
          />

          <Button 
            variant="contained" 
            color="secondary" 
            className={this.props.classes.button} 
            type="submit" 
          >
            Turn In
            <Icon className={this.props.classes.rightIcon}>send</Icon>
          </Button>
        </form>
      </div>
    );
  }
}

const validate = (values: TurnInDeliverableInfo) => {
  const errors: any = {};

  if (!values.deliverable) {
    errors.deliverable = 'Please enter a url to the finished deliverable';
  }

  return errors;
};

export default reduxForm<TurnInDeliverableInfo, OwnProps>({
  form: 'turnInDeliverable',
  validate,
})(withStyles(styles)(TurnInDeliverableForm));
