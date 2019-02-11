import * as React from 'react';
import { Field, InjectedFormProps, reduxForm } from 'redux-form';
import { Deliverable, GradeDeliverableInfo } from '../../../Types';
import { renderTextField } from '../../helpers/form_helpers';

interface OwnProps {
  errorMessage: string;
  deliverable: Deliverable;
}

type Props = OwnProps & InjectedFormProps<GradeDeliverableInfo, OwnProps>;

class GradeDeliverableForm extends React.Component<Props, {}> {
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
    });
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <div>
        {this.renderAlert()}
        <form onSubmit={handleSubmit}>
          <Field
            label="Grade"
            name="grade"
            component={renderTextField}
            type="number"
          />

          {/* <Field
            label="Completed"
            name="completed"
            component={renderTextField}
            type="text"
          /> */}

          <button type="submit">Grade</button>
        </form>
      </div>
    );
  }
}

export default reduxForm<GradeDeliverableInfo, OwnProps>({
  form: 'gradeDeliverable',
})(GradeDeliverableForm);
