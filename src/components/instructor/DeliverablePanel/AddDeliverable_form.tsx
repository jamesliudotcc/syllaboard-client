import * as React from 'react';
import { Field, InjectedFormProps, reduxForm } from 'redux-form';
import {
  commaListParser,
  renderDatePicker,
  renderDropdown,
  renderTextField,
} from '../../helpers/form_helpers';

import { NewDeliverableInfo } from '../../../Types';

interface OwnProps {
  errorMessage: string;
}

type Props = OwnProps & InjectedFormProps<NewDeliverableInfo, OwnProps>;

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

  // componentWillMount () {
  //   this.props.initialize({
  //   });
  // }

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
          // TODO: Change to textarea
          <Field
            label="Instructions"
            name="instructions"
            component={renderTextField}
            type="text"
          />
          <Field
            label="Resources"
            name="resourceUrls"
            component={renderTextField}
            type="text"
          />
          <button type="submit">Add</button>
        </form>
      </div>
    );
  }
}

const validate = (values: NewDeliverableInfo) => {
  const errors: any = {};

  if (!values.name) {
    errors.name = 'Please enter a name for the deliverable';
  }

  // // TODO: This is weird...
  // if (commaListParser(values.cohortType.join('')).length > 0) {
  //   errors.cohortType = 'Please enter a comma seperated list. Ex. WDI,UX';
  // }

  // if (!values.cohortWeek) {
  //   errors.cohortWeek = 'Please enter the estimated week for the deliverable';
  // }

  if (!values.instructions) {
    errors.instructions = 'Please enter some instructions';
  }

  if (!values.resourcesUrls) {
    errors.resourcesUrls = 'Please enter a password';
  }

  return errors;
};

export default reduxForm<NewDeliverableInfo, OwnProps>({
  form: 'addDeliverable',
  validate,
})(AddDeliverableForm);
