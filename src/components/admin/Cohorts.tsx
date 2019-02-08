import * as React from 'react';
import { NewCohortInfo, Cohort } from '../../Types';
import AddCohortForm from './AddCohort_form';
import ShowAllCohorts from './ShowAllCohorts';
import { WithStyles, Theme, createStyles, withStyles } from '@material-ui/core';

const styles = (theme: Theme) => createStyles({
  spaced: {
    margin: theme.spacing.unit,
  }
});

export interface OwnProps {
  cohorts: Cohort[];
  errorMessage: string,
  showAddCohort: boolean,
  toggleAddCohort: () => void,
  addNewCohort: (input: NewCohortInfo) => void
}

type Props = OwnProps & WithStyles<typeof styles>;

class Cohorts extends React.Component<Props, {}> {

  handleSubmit = (input: NewCohortInfo) => {
    this.props.addNewCohort(input);
  };

  render() {
    const cohorts = {
      cohorts: this.props.cohorts
    }

    const addCohortPanel = this.props.showAddCohort
      ?
        <div>
          <AddCohortForm
            onSubmit={this.handleSubmit}
            errorMessage={this.props.errorMessage}
          />
        </div>
      :
        <div></div>;                                     

    return (
      <div>
        <h1>Cohorts</h1>
        <button onClick={this.props.toggleAddCohort}>+</button>
        <hr/>
        {addCohortPanel}
        <ShowAllCohorts {...cohorts} />
      </div>
    );
  }
}

export default withStyles(styles)(Cohorts);
