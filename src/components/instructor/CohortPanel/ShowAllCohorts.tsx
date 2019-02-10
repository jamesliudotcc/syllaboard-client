import * as React from 'react';
import { Theme, WithStyles, createStyles, withStyles } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import { Cohort } from '../../../Types';
import CohortCard from './CohortCard';

const styles = (theme: Theme) => createStyles({
  card: {
    background: 'chartreuse',
  },
  spinner: {
    marginTop: '.25em'
  }
});

export interface OwnProps {
  cohorts: Cohort[];
  selectCohort: (input: Cohort) => void;
  removeCohort: (input: Cohort) => void;
}

type Props = OwnProps & WithStyles<typeof styles>;

class ShowAllCohorts extends React.Component<Props, {}> {
  
  render () {
    const cohortCards = this.props.cohorts.length < 1 
    ? <Grid item>
        <CircularProgress className={this.props.classes.spinner} /> 
      </Grid>
    : this.props.cohorts.map((cohort, i) => (
        <Grid key={i} item xs={12} sm={6}>
          <CohortCard  
            key={cohort._id} 
            cohort={cohort}
            selectCohort={this.props.selectCohort}
            removeCohort={this.props.removeCohort} 
          />
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
