import { createStyles, Theme, WithStyles, withStyles } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import * as React from 'react';
import { Cohort } from '../../../Types';

const styles = (theme: Theme) => createStyles({
  card: {
    display: 'flex',
    margin: theme.spacing.unit,
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
  key: {
    color: theme.palette.text.secondary,
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
  removeCohort: (input: Cohort) => void;
  selectCohort: (input: Cohort) => void;
  cohort: Cohort;
}

type Props = OwnProps & WithStyles<typeof styles>;

const dateString = (date: Date) => {
  return new Date(date).toLocaleDateString('en-US', {  
    day : 'numeric',
    month : 'short',
    year : 'numeric',
  })
}

class CohortCard extends React.Component<Props, {}> {                
  handleDelete = () => {
    this.props.removeCohort(this.props.cohort)
  }

  handleEdit = () => {
    this.props.selectCohort(this.props.cohort);
  }
 
  render() {

    return (
      <Card className={this.props.classes.card}>
        <div className={this.props.classes.details}>
          <CardContent className={this.props.classes.content}>
            <Typography component="h5" variant="h5">
              {this.props.cohort.name}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              End-Date: {dateString(this.props.cohort.endDate)}
            </Typography>
          </CardContent>
          <Divider variant="middle" />
          <CardContent>
            <Typography className={this.props.classes.key}><strong>Instructor Key:</strong> {this.props.cohort.instructorKey}</Typography>
            <Typography className={this.props.classes.key}><strong>Student Key:</strong> {this.props.cohort.studentKey}</Typography>
            <div className={this.props.classes.controls}>
              <IconButton 
                className={this.props.classes.edit} 
                aria-label="Edit"
                onClick={this.handleEdit}
              >
                <EditIcon />
              </IconButton>
              <IconButton className={this.props.classes.delete} aria-label="Delete" onClick={this.handleDelete}>
                <DeleteIcon />
              </IconButton>
            </div>
          </CardContent>
        </div>
      </Card>
    );
  }
}

export default withStyles(styles)(CohortCard);