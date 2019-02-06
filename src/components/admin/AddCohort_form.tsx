import * as React from 'react';
import { Field, InjectedFormProps, reduxForm } from 'redux-form';
import { renderDatePicker, renderDropdown, renderTextField } from '../helpers/form_helpers';

import { NewCohortInfo } from '../../Types';

interface OwnProps {
  errorMessage: string;
}

type Props = OwnProps & InjectedFormProps<NewCohortInfo, OwnProps>;

class AddCohortForm extends React.Component<Props, {}> {

  renderAlert() {
    if (this.props.errorMessage) {
      return <div className="alert alert-danger">
        <strong>Oops: </strong>{this.props.errorMessage}
      </div>;
    }
  }

  render() {
    const {handleSubmit} = this.props;
    // TODO: Pull in available campuses from DB
    const tempCampusOptions = [
      {
        value: 'seattleIdGoesHere',
        label: 'Seattle',
      },
      {
        value: 'sanFransiscoIdGoesHere',
        label: 'San Fransisco',
      },
    ]

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
            label="Campus"
            name="campus"
            component={renderDropdown}
            options={tempCampusOptions}
          />

          <Field
            label="Start Date"
            name="startDate"
            component={renderDatePicker}
          />

          <Field
            label="End Date"
            name="endDate"
            component={renderDatePicker}
          />

          <button type="submit">Add</button>
        </form>
      </div>
    );
  }
}

export default reduxForm<NewCohortInfo, OwnProps>({
  form: 'addCohort',
})(AddCohortForm);
