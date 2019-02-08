import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Role } from '../Types';

class Header extends Component<any, any> {

  renderLinks() {
    const dashboardLink = ((role: Role) => {  
      switch(role) {
        case 'admin':
          return (
            <Link className="nav-link" to="/dashboard/admin">Dashboard</Link>
          );
        case 'student':
          return (
            <Link className="nav-link" to="/dashboard/student">Dashboard</Link>
          );
        case 'instructor':
          return (
            <Link className="nav-link" to="/dashboard/instructor">Dashboard</Link>
          );
        default:
          return null;
      }
    })(this.props.role);

    if (this.props.authenticated) {
      return [
        <li key={1} className="nav-item">
          <Link className="nav-link" to="/signout">Sign Out</Link>
        </li>,
        // TODO: Remove after testing
        <li key={2} className="nav-item">
          <Link className="nav-link" to="/feature">Protected Site</Link>
        </li>,
        <li key={3} className="nav-item">
          {dashboardLink}
        </li>,
      ];
    } else {
      return [
        <li key={1} className="nav-item">
          <Link className="nav-link" to="/signin">Sign In</Link>
        </li>,
        <li key={2} className="nav-item">
          <Link className="nav-link" to="/signup">Sign Up</Link>
        </li>,
        // TODO: Remove after testing
        <li key={3} className="nav-item">
          <Link className="nav-link" to="/feature">Protected Site</Link>
        </li>,
      ];
    }
  }

  render() {
    return (
      <nav className="navbar navbar-light">
        <Link to="/" className="navbar-brand">Home</Link>
        <ul className="nav navbar-nav">
          {this.renderLinks()}
        </ul>
      </nav>
    );
  }
}

function mapStateToProps(state: any) {
  return {
    authenticated: state.auth.authenticated,
    role: state.auth.role,
  };
}

export default connect(mapStateToProps)(Header);
