import * as React from 'react';
import { Field, InjectedFormProps, reduxForm } from 'redux-form';
import { roleOptions, User } from '../../../Types';
import { renderDropdown, renderTextField } from '../../helpers/form_helpers';

interface OwnProps {
  errorMessage: string;
  user: User;
}

type Props = OwnProps & InjectedFormProps<User, OwnProps>;

class EditUserForm extends React.Component<Props, {}> {
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
      ...this.props.user,
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

          <button type="submit">Add</button>
        </form>
      </div>
    );
  }
}

export default reduxForm<User, OwnProps>({
  form: 'editUser',
})(EditUserForm);
