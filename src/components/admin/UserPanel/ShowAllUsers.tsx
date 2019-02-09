import { createStyles, Theme, WithStyles, withStyles } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import * as React from 'react';
import { User } from '../../../Types';
import UserCard from './UserCard';

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
  users: User[];
  selectUser: (input: User) => void;
  removeUser: (input: User) => void;
}

type Props = OwnProps & WithStyles<typeof styles>;

class ShowAllUsers extends React.Component<Props, {}> {
  render() {
    const userCards =
      this.props.users.length < 1 ? (
        <Grid item>
          <CircularProgress className={this.props.classes.spinner} />
        </Grid>
      ) : (
        this.props.users.map((user: User, i: number) => (
          <Grid key={i} item xs={12} sm={6}>
            <UserCard
              key={user._id}
              user={user}
              selectUser={this.props.selectUser}
              removeUser={this.props.removeUser}
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
        {userCards}
      </Grid>
    );
  }
}

export default withStyles(styles)(ShowAllUsers);
