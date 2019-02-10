import * as React from 'react';
import { Field, InjectedFormProps, reduxForm } from 'redux-form';
import { renderDatePicker, renderTextField } from '../../helpers/form_helpers';

import { NewCohortInfo } from '../../../Types';

interface OwnProps {
  errorMessage: string;
}

const findThreeMonthsFrom = (today: Date) => {
  return new Date(today.getFullYear(), today.getMonth()+3, 
  today.getDate())
}
let initDate = {
  today: new Date,
  endDate: findThreeMonthsFrom(new Date)
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

  componentWillMount () {
    this.props.initialize({
      startDate: initDate.today,
      endDate: initDate.endDate,
    });
  }

  render() {
    const {handleSubmit} = this.props;

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
