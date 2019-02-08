import * as React from 'react';
import { NewCohortInfo, Cohort } from '../../Types';
import { WithStyles, Theme, createStyles, withStyles } from '@material-ui/core';
import AddCohortForm from './AddCohort_form';
import AddCircle from '@material-ui/icons/AddCircle';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import ShowAllCohorts from './ShowAllCohorts';
import Typography from '@material-ui/core/Typography';

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
        <Grid container direction="row" justify="space-between" alignItems="center">
          <Grid item>
            <Typography variant="h4">Cohorts</Typography>
          </Grid>
          <Grid item>
            <IconButton aria-label="Add Cohort">
              <AddCircle onClick={this.props.toggleAddCohort} />
            </IconButton>
          </Grid>
        </Grid>
        <Divider />
        {addCohortPanel}
        <ShowAllCohorts {...cohorts} />
      </div>
    );
  }
}

export default withStyles(styles)(Cohorts);
