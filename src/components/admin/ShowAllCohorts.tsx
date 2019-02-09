import * as React from 'react';
import { Cohort } from '../../Types';
import CohortCard from './CohortCard';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import { Theme, WithStyles, createStyles, withStyles } from '@material-ui/core';
import { removeCohort } from '../../actions/admin_dashboard';

const styles = (theme: Theme) => createStyles({
  card: {
    background: 'chartreuse',
  },
  spinner: {
    marginTop: '.25em'
  }
});

export interface OwnProps {
  cohorts: Cohort[],
  removeCohort: (input: Cohort) => void
}

type Props = OwnProps & WithStyles<typeof styles>;


class ShowAllCohorts extends React.Component<Props, {}> {
  
  render () {
    const cohortCards = this.props.cohorts.length < 1 
    ? <Grid item>
        <CircularProgress className={this.props.classes.spinner} /> 
      </Grid>
    : this.props.cohorts.map(cohort => (
        <Grid item xs={12} sm={6}>
          <CohortCard  key={cohort.instructorKey} {...cohort} removeCohort={this.props.removeCohort} />
        </Grid>
      ));

    return (
      <Grid container spacing={24} justify="space-around"
      alignItems="flex-start">
        {cohortCards}
      </Grid>
    );
  }
}                                

export default withStyles(styles)(ShowAllCohorts);
