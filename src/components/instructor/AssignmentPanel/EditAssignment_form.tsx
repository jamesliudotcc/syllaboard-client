import * as React from 'react';
import { Field, InjectedFormProps, reduxForm } from 'redux-form';
import { Assignment } from '../../../Types';
import { renderTextField } from '../../helpers/form_helpers';

interface OwnProps {
  errorMessage: string;
  assignment: Assignment;
}

type Props = OwnProps & InjectedFormProps<Assignment, OwnProps>;

class EditAssignmentForm extends React.Component<Props, {}> {
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
      ...this.props.assignment,
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

          <button type="submit">Edit</button>
        </form>
      </div>
    );
  }
}

export default reduxForm<Assignment, OwnProps>({
  form: 'editAssignment',
})(EditAssignmentForm);
