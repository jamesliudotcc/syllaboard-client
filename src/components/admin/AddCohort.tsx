import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Redirect } from 'react-router-dom';
import { Dispatch } from 'redux';
import { authError } from '../../actions/auth';
import { addNewCohort } from '../../actions/cohort';
import { State } from '../../reducers';
import { NewCohortInfo } from '../../Types';
import { connectedComponentHelper } from '../../utils/connectedComponent';
import AddCohortForm from './AddCohort_form';

const mapStateToProps = (state: State) => ({
  authenticated: state.auth.authenticated,
  errorMessage: state.auth.error,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  authError: (error: string) => dispatch(authError(error)),
  addNewCohort: (cohortInfo: NewCohortInfo) =>
    addNewCohort(cohortInfo)(dispatch),
});

const { propsGeneric, connect } = connectedComponentHelper<{}>()(
  mapStateToProps,
  mapDispatchToProps,
);
type ComponentProps = typeof propsGeneric;

type Props = RouteComponentProps<any> & ComponentProps;

class AddCohort extends React.Component<Props, {}> {
  componentWillUnmount() {
    if (this.props.errorMessage) {
      this.props.authError('null');
    }
  }

  handleSubmit = (input: NewCohortInfo) => {
    this.props.addNewCohort(input);
  };

  getRedirectPath() {
    if (!this.props.location) {
      return '/';
    }
    const locationState = this.props.location.state;
    if (locationState && locationState.from.pathname) {
      return locationState.from.pathname; // redirects to referring url
    } else {
      return '/';
    }
  }

  render() {
    return (
      <div>
        <AddCohortForm
          onSubmit={this.handleSubmit}
          errorMessage={this.props.errorMessage}
        />
      </div>
    );
  }
}

export default connect(AddCohort);
