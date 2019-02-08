import * as React from 'react';
import { Cohort } from '../../Types';
import CohortCard from './CohortCard';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import { Theme, WithStyles, createStyles, withStyles } from '@material-ui/core';

const styles = (theme: Theme) => createStyles({
  card: {
    background: 'chartreuse',
  }
});

export interface OwnProps {
  cohorts: Cohort[]
}

type Props = OwnProps & WithStyles<typeof styles>;


class ShowAllCohorts extends React.Component<Props, {}> {
  
  render () {
    const cohortCards = this.props.cohorts.length < 1 
    ? <Grid item>
        <CircularProgress /> 
      </Grid>
    : this.props.cohorts.map(cohort => (
        <Grid item xs={12} sm={6}>
          <CohortCard  key={cohort.instructorKey} {...cohort} />
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
