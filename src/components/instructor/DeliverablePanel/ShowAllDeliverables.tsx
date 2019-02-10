import { createStyles, Theme, WithStyles, withStyles } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import * as React from 'react';
import { Deliverable } from '../../../Types';
import DeliverableCard from './DeliverableCard';

const styles = (theme: Theme) =>
  createStyles({
    card: {
      background: 'chartreuse',
    },
    spinner: {
      marginTop: '.25em',
    },
  });

export interface OwnProps {
  deliverables: Deliverable[];
  selectDeliverable: (input: Deliverable) => void;
  removeDeliverable: (input: Deliverable) => void;
}

type Props = OwnProps & WithStyles<typeof styles>;

class ShowAllDeliverables extends React.Component<Props, {}> {
  render() {
    const deliverableCards =
      this.props.deliverables.length < 1 ? (
        <Grid item>
          <CircularProgress className={this.props.classes.spinner} />
        </Grid>
      ) : (
        this.props.deliverables.map((deliverable, i) => (
          <Grid key={i} item xs={12} sm={6}>
            <DeliverableCard
              key={deliverable._id}
              deliverable={deliverable}
              selectDeliverable={this.props.selectDeliverable}
              removeDeliverable={this.props.removeDeliverable}
            />
          </Grid>
        ))
      );

    return (
      <Grid
        container
        spacing={24}
        justify="space-around"
        alignItems="flex-start"
      >
        {deliverableCards}
      </Grid>
    );
  }
}

export default withStyles(styles)(ShowAllDeliverables);
