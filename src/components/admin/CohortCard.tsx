import * as React from 'react';
import { Cohort } from '../../Types';
import { WithStyles, Theme, createStyles, withStyles } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import UiTheme from '../../style/theme';

const styles = (theme: Theme) => createStyles({
  card: {
    display: 'flex',
    margin: theme.spacing.unit
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
    paddingLeft: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
  },
  edit: {
    color: 'green'
  },
  delete: {
    color: 'red'
  }
});

type Props = Cohort & WithStyles<typeof styles>;

class CohortCard extends React.Component<Props, {}> {                  
 
  render() {
    return (
      <Card className={this.props.classes.card}>
        <div className={this.props.classes.details}>
          <CardContent className={this.props.classes.content}>
            <Typography component="h5" variant="h5">
              {this.props.name}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              {this.props.instructors}
            </Typography>
          </CardContent>
          <div className={this.props.classes.controls}>
          {/* TODO Colour the buttons! */}
          <IconButton className={this.props.classes.edit} aria-label="Edit">
            <EditIcon />
          </IconButton>
          <IconButton className={this.props.classes.delete} aria-label="Delete">
            <DeleteIcon />
          </IconButton>
          </div>
        </div>
      </Card>
    );
  }
}

export default withStyles(styles)(CohortCard);