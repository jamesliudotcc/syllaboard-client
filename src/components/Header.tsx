import React, { Component } from 'react';
// import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';
import { Role } from '../Types';

// Material UI imports
import {
  createStyles,
  Theme,
  withStyles,
  WithStyles,
} from '@material-ui/core/styles';

import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { connectedComponentHelper } from '../utils/connectedComponent';

const styles = (theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      minHeight: '64px',
      marginBottom: '2em',
    },
    header: {
      position: 'absolute',
      top: '0',
      left: '0',
    },
    navLink: {
      textDecoration: 'none',
      color: theme.palette.text.secondary,
      [theme.breakpoints.down('sm')]: {
        margin: '0',
      },
      [theme.breakpoints.up('md')]: {
        margin: '0 1.5em',
      },
    },
    grow: {
      flexGrow: 1,
    },
    menuButton: {
      marginLeft: -12,
      marginRight: 20,
    },
  });

const mapStateToProps = (state: any) => ({
  authenticated: state.auth.authenticated,
  role: state.auth.role,
});

const mapDispatchToProps = () => ({});

const { propsGeneric, connect } = connectedComponentHelper<{}>()(
  mapStateToProps,
  mapDispatchToProps,
);
type ComponentProps = typeof propsGeneric;

type Props = RouteComponentProps<any> &
  ComponentProps &
  WithStyles<typeof styles>;

class Header extends Component<Props, {}> {
  renderLinks() {
    const dashboardLink = ((role: Role) => {
      switch (role) {
        case 'admin':
          return (
            <Button key="daLink">
              <Link
                className={this.props.classes.navLink}
                to="/dashboard/admin"
              >
                Dashboard
              </Link>
            </Button>
          );
        case 'student':
          return (
            <Button key="dsLink">
              <Link
                className={this.props.classes.navLink}
                to="/dashboard/student"
              >
                Dashboard
              </Link>
            </Button>
          );
        case 'instructor':
          return (
            <Button key="diLink">
              <Link
                className={this.props.classes.navLink}
                to="/dashboard/instructor"
              >
                Dashboard
              </Link>
            </Button>
          );
        default:
          return null;
      }
    })(this.props.role);

    if (this.props.authenticated) {
      return [
        dashboardLink,
        <Button key="signout">
          <Link className={this.props.classes.navLink} to="/signout">
            Sign Out
          </Link>
        </Button>,
      ];
    } else {
      return [
        <Button key="signin">
          <Link className={this.props.classes.navLink} to="/signin">
            Sign In
          </Link>
        </Button>,
        <Button key="signup">
          <Link className={this.props.classes.navLink} to="/signup">
            Sign Up
          </Link>
        </Button>,
      ];
    }
  }

  render() {
    return (
      <div className={this.props.classes.root}>
        <AppBar position="static" className={this.props.classes.header}>
          <Toolbar>
            <Typography
              key="eatMyShorts"
              variant="h6"
              color="inherit"
              className={this.props.classes.grow}
            >
              Syllaboard
            </Typography>
            {this.renderLinks()}
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default connect(withStyles(styles)(Header));
