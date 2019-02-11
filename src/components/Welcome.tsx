import React from 'react';

// Material UI imports
import { createStyles, Theme, withStyles, WithStyles, } from '@material-ui/core/styles';
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
      <Typography variant="h1">Welcome to Syllaboard!</Typography>
    </div>
  );
};
