import { createStyles, Theme, WithStyles, withStyles } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/Delete';
import AddCircleIcon from '@material-ui/icons/AddCircleOutline'
import EditIcon from '@material-ui/icons/Edit';
import * as React from 'react';
import { Assignment } from '../../../Types';

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
  removeAssignment: (input: Assignment) => void;
  selectAssignment: (input: Assignment) => void;
  toggleEditAssignment: () => void;
  toggleAddDeliverable: () => void;
  assignment: Assignment;
}

type Props = OwnProps & WithStyles<typeof styles>;

class AssignmentCard extends React.Component<Props, {}> {
  handleDelete = () => {
    this.props.removeAssignment(this.props.assignment);
  };

  handleAssign = () => {
    this.props.selectAssignment(this.props.assignment);
    this.props.toggleAddDeliverable();
  }

  handleEdit = () => {
    this.props.selectAssignment(this.props.assignment);
    this.props.toggleEditAssignment();
  };

  render() {
    return (
      <Card className={this.props.classes.card}>
        <div className={this.props.classes.details}>
          <CardContent className={this.props.classes.content}>
            <Typography component="h5" variant="h5">
              {this.props.assignment.name}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              End-Date:
            </Typography>
          </CardContent>
          <Divider variant="middle" />
          <div className={this.props.classes.controls}>
            <IconButton
              className={this.props.classes.edit}
              aria-label="Edit"
              onClick={this.handleEdit}
            >
              <EditIcon />
            </IconButton>
            <IconButton
              className={this.props.classes.delete}
              aria-label="Assign"
              onClick={this.handleAssign}
            >
              <AddCircleIcon />
            </IconButton>
            <IconButton
              className={this.props.classes.delete}
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

export default withStyles(styles)(AssignmentCard);
