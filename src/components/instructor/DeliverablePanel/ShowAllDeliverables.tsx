import { createStyles, Theme, WithStyles, withStyles } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import * as React from 'react';
import { Assignment } from '../../../Types';
import AssignmentCard from './AssignmentCard';

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
  assignments: Assignment[];
  selectAssignment: (input: Assignment) => void;
  removeAssignment: (input: Assignment) => void;
}

type Props = OwnProps & WithStyles<typeof styles>;

class ShowAllAssignments extends React.Component<Props, {}> {
  render() {
    const assignmentCards =
      this.props.assignments.length < 1 ? (
        <Grid item>
          <CircularProgress className={this.props.classes.spinner} />
        </Grid>
      ) : (
        this.props.assignments.map((assignment, i) => (
          <Grid key={i} item xs={12} sm={6}>
            <AssignmentCard
              key={assignment._id}
              assignment={assignment}
              selectAssignment={this.props.selectAssignment}
              removeAssignment={this.props.removeAssignment}
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
        {assignmentCards}
      </Grid>
    );
  }
}

export default withStyles(styles)(ShowAllAssignments);
