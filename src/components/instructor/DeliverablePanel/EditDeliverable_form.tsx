import * as React from 'react';
import { Field, InjectedFormProps, reduxForm } from 'redux-form';
import { Deliverable } from '../../../Types';
import { renderTextField } from '../../helpers/form_helpers';

interface OwnProps {
  errorMessage: string;
  deliverable: Deliverable;
}

type Props = OwnProps & InjectedFormProps<Deliverable, OwnProps>;

class EditDeliverableForm extends React.Component<Props, {}> {
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
      ...this.props.deliverable,
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

export default reduxForm<Deliverable, OwnProps>({
  form: 'editDeliverable',
})(EditDeliverableForm);
