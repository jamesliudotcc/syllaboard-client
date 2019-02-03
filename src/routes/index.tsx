import React from 'react';
import { Route, Switch } from 'react-router';

import NoMatch from '../components/NoMatch';

import Signin from '../components/auth/signin';
import Signout from '../components/auth/signout';
import Signup from '../components/auth/signup';
import Feature from '../components/feature';
import Header from '../components/header';
import { PrivateRoute } from '../components/auth/require_auth';
import Welcome from '../components/welcome';

const routes = (
  <div>
    <Header/>
    <Switch>
      <Route exact path="/" component={Welcome} />
      <Route path="/signin" component={Signin} />
      <Route path="/signout" component={Signout} />
      <Route path="/signup" component={Signup} />
      <PrivateRoute path="/feature" component={Feature} />
      <Route component={NoMatch} />
    </Switch>
  </div>
);

export default routes;
