import * as React from 'react';
import { Field, InjectedFormProps, reduxForm } from 'redux-form';
import { renderTextField } from './form_helpers';

import { Credentials } from '../../Types';

interface OwnProps {
  errorMessage: string;
}

type Props = OwnProps & InjectedFormProps<Credentials, OwnProps>;

class SigninForm extends React.Component<Props, {}> {

  renderAlert() {
    if (this.props.errorMessage) {
      return <div className="alert alert-danger">
        <strong>Oops: </strong>{this.props.errorMessage}
      </div>;
    }
  }

  render() {
    const {handleSubmit} = this.props;

    return (
      <div>
        {this.renderAlert()}
        <form onSubmit={handleSubmit}>

          <Field
            label="Username"
            name="email"
            component={renderTextField}
            type="text"/>

          <Field
            label="Password"
            name="password"
            component={renderTextField}
            type="password"/>

          <button type="submit">Sign In</button>
        </form>
      </div>
    );
  }
}

export default reduxForm<Credentials, OwnProps>({
  form: 'signin',
})(SigninForm);
