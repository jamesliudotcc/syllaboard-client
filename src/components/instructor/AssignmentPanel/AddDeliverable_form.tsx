import * as React from 'react';
import { Field, InjectedFormProps, reduxForm } from 'redux-form';
import { commaListParser, renderDatePicker, renderDropdown, renderTextField } from '../../helpers/form_helpers';

import { ID, NewDeliverableInfo } from '../../../Types';

interface OwnProps {
  errorMessage: string;
  cohorts: Array<{ name: string, value: ID }>;
  assignmentId: ID;
}

type Props = OwnProps & InjectedFormProps<NewDeliverableInfo, OwnProps>;

class AddDeliverableForm extends React.Component<Props, {}> {

  renderAlert() {
    if (this.props.errorMessage) {
      return <div className="alert alert-danger">
        <strong>Oops: </strong>{this.props.errorMessage}
      </div>;
    }
  }

  componentWillMount () {
    this.props.initialize({
      assignmentId: this.props.assignmentId,
    });
  }

  render() {
    const {handleSubmit} = this.props;

    return (
      <div>
        {this.renderAlert()}
        <form onSubmit={handleSubmit}>


          <Field
            label="Due Date"
            name="dueDate"
            component={renderDatePicker}
          />

          <Field
            label="Cohort"
            name="cohortId"
            component={renderDropdown}
            option={this.props.cohorts}
          />

          <button type="submit">Add</button>
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
})(AddDeliverableForm);
