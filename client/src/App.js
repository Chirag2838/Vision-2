import React, { Component } from 'react';
import './App.css';
import { Route, Switch, Redirect, withRouter} from 'react-router-dom';
import Layout from './hoc/Layout/Layout';
import Auth from './Container/Auth/Auth';

class App extends Component {

  render() {

    let routes = (

      <Switch>
        <Route path='/' component={Auth} />
        <Redirect path='/' />
      </Switch>
    );

    return (

      <Layout>
        {routes}
      </Layout>
    );
  }
}

export default withRouter(App);
