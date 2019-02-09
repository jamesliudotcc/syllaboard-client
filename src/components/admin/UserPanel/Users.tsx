import {
  createStyles,
  Modal,
  Theme,
  WithStyles,
  withStyles,
} from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import * as React from 'react';
import { User } from '../../../Types';

import EditUserForm from './EditUser_form';
import ShowAllUsers from './ShowAllUsers';

const styles = (theme: Theme) =>
  createStyles({
    spaced: {
      margin: theme.spacing.unit,
    },
    add: {
      color: '#0cb10c',
    },
    hide: {
      color: theme.palette.secondary.dark,
    },
    paper: {
      margin: '25% auto',
      width: theme.spacing.unit * 50,
      height: theme.spacing.unit * 50,
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: theme.spacing.unit * 4,
      outline: 'none',
    },
  });

export interface OwnProps {
  users: User[];
  errorMessage: string;
  showEditUser: boolean;
  selectedUser: User | null;
  selectUser: (user: User | null) => void;
  toggleEditUser: () => void;
  removeUser: (input: User) => void;
  updateUser: (input: User) => void;
}

type Props = OwnProps & WithStyles<typeof styles>;

class Users extends React.Component<Props, {}> {
  handleEditSubmit = (input: User) => {
    this.props.selectUser(null);
    this.props.updateUser(input);
  };

  render() {
    const users = {
      users: this.props.users,
      removeUser: this.props.removeUser,
      updateUser: this.props.updateUser,
      selectUser: this.props.selectUser,
    };
    const editUserPanel = (
      <Modal
        open={this.props.showEditUser}
        // className={this.props.classes.paper}
        onClose={
          this.props.showEditUser
            ? this.props.toggleEditUser
            : () => {
                return;
              }
        }
      >
        <div className={this.props.classes.paper}>
          <EditUserForm
            onSubmit={this.handleEditSubmit}
            errorMessage={this.props.errorMessage}
            user={this.props.selectedUser as User}
          />
        </div>
      </Modal>
    );

    return (
      <div>
        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="center"
        >
          <Grid item>
            <Typography variant="h4">Users</Typography>
          </Grid>
          <Grid item />
        </Grid>
        <Divider />
        {editUserPanel}
        <ShowAllUsers {...users} />
      </div>
    );
  }
}

export default withStyles(styles)(Users);
