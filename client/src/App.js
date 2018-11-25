import React, { Component } from 'react';
import './App.css';
import { Route, Switch, Redirect, withRouter} from 'react-router-dom';
import Layout from './hoc/Layout/Layout';
import Auth from './Container/Auth/Auth';
import Signup from './Container/Auth/Signup/Signup';
import Signin from './Container/Auth/Singnin/Signin';
import NewPost from './Container/Post/NewPost/NewPost';
import SearchPage from './Container/SearchPage/SearchPage';
import Homepage from './Container/Homepage/Homepage';
import BlogCategory from './Container/Blog/BlogCategory/BlogCategory';
import MyBlogProfile from './Container/Blog/MyBlogProfile/MyBlogProfile';
import * as actions from './store/actions';
import { connect } from 'react-redux';

class App extends Component {

  componentDidMount () {
    this.props.checkToken();
  }

  render() {

    let routes = (
      <Switch>
        <Route path='/auth' component={Auth} />
        <Route path='/signin' component={Signin} />
        <Route path='/signup' component={Signup} />
        <Redirect to='/auth' />
      </Switch>
    )

    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path='/MyBlogProfile' component={MyBlogProfile} />
          <Route path='/choose' exact component={BlogCategory} />
          <Route path='/homepage' component={Homepage} />
          <Route path='/search' component={SearchPage} />
          <Route path='/NewPost' component={NewPost} />
          <Redirect to='/homepage' />
        </Switch>
      )
    }

    return (

      <Layout>
        {routes}
      </Layout>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    checkToken: () => dispatch(actions.checkAuthState())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
