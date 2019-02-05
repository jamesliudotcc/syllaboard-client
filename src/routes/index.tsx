import React from 'react';
import { Route, Switch } from 'react-router';

import NoMatch from '../components/NoMatch';

import { PrivateRoute } from '../components/auth/require_auth';
import Signin from '../components/auth/Signin';
import Signout from '../components/auth/Signout';
import Signup from '../components/auth/Signup';
import Feature from '../components/Feature';
import Header from '../components/Header';
import Welcome from '../components/Welcome';

const routes = (
  <div>
    <Header/>
    <Switch>
      <Route exact path="/" component={Welcome} />
      <Route path="/signin" component={Signin} />
      <Route path="/signout" component={Signout} />
      <Route path="/signup" component={Signup} />
      <PrivateRoute path="/feature" component={() => (
        <Feature />)} />
      <Route component={NoMatch} />
    </Switch>
  </div>
);

export default routes;
