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

import Dashboard from '../components/admin/Dashboard';


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
      <PrivateRoute path="/dashboard" component={() => (
        <Dashboard />)} />
      <Route component={NoMatch} />
    </Switch>
  </div>
);

export default routes;
