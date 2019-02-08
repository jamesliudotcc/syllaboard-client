import * as React from 'react';
import { Cohort } from '../../Types';
import CohortCard from './CohortCard';
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
    const cohortCards = this.props.cohorts.map(cohort => (<CohortCard {...cohort} />));
    
    return (
      <div>
        {cohortCards}
      </div>
    );
  }
}                                

export default withStyles(styles)(ShowAllCohorts);
