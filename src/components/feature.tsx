import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';
import { Dispatch } from 'redux';
import * as actions from '../actions';
import { State } from '../reducers';
import { connectedComponentHelper } from '../utils/connectedComponent';

const mapStateToProps = (state: State) => ({
  message: state.auth.message,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchMessage: () => actions.fetchMessage()(dispatch),
});

const { propsGeneric, connect } = connectedComponentHelper<{}>()(mapStateToProps, mapDispatchToProps);
type ComponentProps = typeof propsGeneric;

type Props = RouteComponentProps<any> & ComponentProps;

class Feature extends React.Component<Props, {}> {

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

export default connect(Feature);
