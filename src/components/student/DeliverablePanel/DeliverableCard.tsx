import { createStyles, Theme, WithStyles, withStyles } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import EditIcon from '@material-ui/icons/Edit';
import * as React from 'react';
import { Deliverable } from '../../../Types';

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

const dateString = (date: Date) => {
  return new Date(date).toLocaleDateString('en-US', {  
    day : 'numeric',
    month : 'short',
    year : 'numeric',
  })
}

export interface OwnProps {
  selectDeliverable: (input: Deliverable) => void;
  deliverable: Deliverable;
}

type Props = OwnProps & WithStyles<typeof styles>;

class DeliverableCard extends React.Component<Props, {}> {
  handleEdit = () => {
    this.props.selectDeliverable(this.props.deliverable);
  };

  render() {
    return (
      <Card className={this.props.classes.card}>
        <div className={this.props.classes.details}>
          <CardContent className={this.props.classes.content}>
            <Typography component="h5" variant="h5">
              {this.props.deliverable.name}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              Due-Date: {dateString(this.props.deliverable.deadline)}
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
          </div>
        </div>
      </Card>
    );
  }
}

export default withStyles(styles)(DeliverableCard);
