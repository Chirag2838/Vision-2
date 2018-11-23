import React, { Component } from 'react';
import './App.css';
import { Route, Switch, Redirect, withRouter} from 'react-router-dom';
import Layout from './hoc/Layout/Layout';
import Auth from './Container/Auth/Auth';
import Signup from './Container/Auth/Signup/Signup';
import Signin from './Container/Auth/Singnin/Signin';
import NewPost from './Container/Post/NewPost/NewPost';

class App extends Component {

  render() {

    let routes = (

      <Switch>
        <Route path='/NewPost' component={NewPost} />
        <Route path='/signin' component={Signin} />
        <Route path='/signup' component={Signup} />
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
