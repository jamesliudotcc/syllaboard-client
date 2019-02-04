import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as actions from '../actions';

class Feature extends Component<any, any> {

  componentWillMount() {
    this.props.fetchMessage();
  }

  render() {
    return (
      <div>
        <p><strong>Welcome to the secure page!</strong></p>
        <br/>
        <p>Here's a secret response from the server that your token returned:</p>
        ____________________________________________________________
        <p>{this.props.message}</p>
        ____________________________________________________________
        <br/>
        <p>Notice that clicking these links redirect to the homepage, as you are already signed in:</p>
        <p>
          <Link to={'/signin'}>/signin</Link> | <Link to={'/signup'}>/signup</Link>
        </p>
      </div>

    );
  }
}

function mapStateToProps(state: any) {
  return {
    message: state.auth.message,
  };
}

export default connect(mapStateToProps, actions)(Feature);
