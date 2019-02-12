import { createStyles, Theme, WithStyles, withStyles } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import * as React from 'react';
import { Deliverable, User } from '../../../Types';

import dateFormat from 'date-fns/format';
import dateDistance from 'date-fns/formatDistance';

const styles = (theme: Theme) =>
  createStyles({
    card: {
      display: 'flex',
      margin: theme.spacing.unit,
      maxWidth: '20em',
    },
    details: {
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
    },
    content: {
      flex: '1 0 auto',
    },
    controls: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingLeft: theme.spacing.unit,
      paddingBottom: theme.spacing.unit,
    },
    edit: {
      color: '#0cb10c',
    },
    delete: {
      color: '#e40c0c',
    },
  });

export interface OwnProps {
  removeDeliverable: (input: Deliverable) => void;
  selectDeliverable: (input: Deliverable) => void;
  deliverable: Deliverable;
}

type Props = OwnProps & WithStyles<typeof styles>;

class DeliverableCard extends React.Component<Props, {}> {
  handleDelete = () => {
    // TODO: implement delete
    // this.props.removeDeliverable(this.props.deliverable);
    return;
  };

  handleGrade = () => {
    this.props.selectDeliverable(this.props.deliverable);
  };

  render() {
    const { classes, deliverable } = this.props;
    const now = new Date();
    const deadline = new Date(deliverable.deadline);

    const getStudentName = () =>
      (deliverable.student as User).firstName
        ? `${(deliverable.student as User).firstName} ${
            (deliverable.student as User).lastName
          }`
        : null;
    
    const getOverdue = (turnedIn: Date, dueDate: Date) => (
      turnedIn > dueDate
        ?
          <Typography variant="subtitle1" color="error">
            Overdue by {dateDistance(dueDate, turnedIn)}
          </Typography>
        :
          <Typography variant="subtitle1" color="textSecondary">
            On Time
          </Typography>
    )

    const getTurnedInInfo = () =>
      deliverable.turnedIn ? (
        <div>
          <Typography variant="subtitle1" color="textSecondary">
            {`Turned in: ${dateFormat(new Date(deliverable.turnedIn), 'MM/dd/yy')}`}
          </Typography>
          {getOverdue(new Date(deliverable.turnedIn), deadline)}
          {getGrade()}
        </div>
      ) : now > deadline ? (
        <Typography variant="subtitle1" color="error">
          Overdue
        </Typography>
      ) : (
        <Typography variant="subtitle1" color="textSecondary">
          Not turned in
        </Typography>
      );

    const getGrade = () =>
      deliverable.grade ? (
        <Typography variant="subtitle1" color="textSecondary">
          {`Grade: ${deliverable.grade}`}
        </Typography>
      ) : (
        <Typography variant="subtitle1" color="error">
          Needs Graded
        </Typography>
      );

    return (
      <Card className={classes.card}>
        <div className={classes.details}>
          <CardContent className={classes.content}>
            <Typography component="h5" variant="h5">
              {deliverable.name}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              {getStudentName() || 'Loading...'}
            </Typography>
            {getTurnedInInfo()}
          </CardContent>
          <Divider variant="middle" />
          <div className={classes.controls}>
            <IconButton
              className={classes.edit}
              aria-label="Grade"
              onClick={this.handleGrade}
            >
              <EditIcon />
            </IconButton>
            <IconButton
              className={classes.delete}
              aria-label="Delete"
              onClick={this.handleDelete}
            >
              <DeleteIcon />
            </IconButton>
          </div>
        </div>
      </Card>
    );
  }
}

export default withStyles(styles)(DeliverableCard);
