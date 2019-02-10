import * as React from 'react';
import { Field, InjectedFormProps, reduxForm } from 'redux-form';
import { roleOptions, Cohort } from '../../../Types';
import { renderDropdown, renderTextField } from '../../helpers/form_helpers';

interface OwnProps {
  errorMessage: string;
  cohort: Cohort;
}

type Props = OwnProps & InjectedFormProps<Cohort, OwnProps>;

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
            label="Role"
            name="role"
            component={renderDropdown}
            options={roleOptions}
          />

          <button type="submit">Edit</button>
        </form>
      </div>
    );
  }
}

export default reduxForm<Cohort, OwnProps>({
  form: 'editCohort',
})(EditCohortForm);
