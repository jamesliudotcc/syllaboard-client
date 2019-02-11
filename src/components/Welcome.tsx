import React from 'react';

import Signin from '../components/auth/Signin'
import Signup from '../components/auth/Signup'

// Material UI imports
import { createStyles, Theme, withStyles, WithStyles, } from '@material-ui/core/styles';

import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const styles = (theme: Theme) => createStyles({
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
});

function mapStateToProps(state: any) {
  return {
    authenticated: state.auth.authenticated,
    role: state.auth.role,
  };
}

export default () => {
  return (
    <div>
      <div />
    </div>
  );
};
