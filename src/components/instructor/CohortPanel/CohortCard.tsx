import { createStyles, Theme, WithStyles, withStyles } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import * as React from 'react';
import { Cohort, User } from '../../../Types';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';

const styles = (theme: Theme) =>
  createStyles({
    card: {
      display: 'flex',
      margin: theme.spacing.unit,
      maxWidth: '20em',
      maxHeight: '25vh',
      overflowY: 'scroll',
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
    bg: {
      backgroundColor: theme.palette.background.paper,
    },
    reset: {
      margin: '0',
      padding: '0',
    },
  });

export interface OwnProps {
  cohort: Cohort;
}

type Props = OwnProps & WithStyles<typeof styles>;

class CohortCard extends React.Component<Props, {}> {
  render() {
    const { cohort } = this.props;
    const students = cohort.students.map((student: User, i) => (
      student ? <ListItem key={student._id}>
        <ListItemText primary={`${student.firstName} ${student.lastName}`} />
      </ListItem> : null
    ));
    const instructors = cohort.instructors.map((instructor: User) =>
      instructor ? (
        <ListItem key={instructor._id}>
          {instructor.firstName} {instructor.lastName}
        </ListItem>
      ) : null,
    );

    return (
      <Card className={this.props.classes.card}>
        <div className={this.props.classes.details}>
          <CardContent className={this.props.classes.content}>
            <Typography component="h5" variant="h5">
              {cohort.name} - {cohort.campus}
            </Typography>
            <List subheader={<li />}>
              <li className={this.props.classes.reset}>
                <ul className={this.props.classes.reset}>
                  <ListSubheader className={this.props.classes.bg}>
                    Instructors
                  </ListSubheader>
                  {instructors}
                </ul>
                <ul className={this.props.classes.reset}>
                  <ListSubheader className={this.props.classes.bg}>
                    Students
                  </ListSubheader>
                  {students}
                </ul>
              </li>
            </List>
          </CardContent>
          <Divider variant="middle" />
          <div className={this.props.classes.controls} />
        </div>
      </Card>
    );
  }
}

export default withStyles(styles)(CohortCard);
