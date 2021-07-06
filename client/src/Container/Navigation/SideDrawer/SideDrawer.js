import React, { Component } from 'react';
import classes from './SideDrawer.css';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions';

class SideDrawer extends Component {

    userProfileHandler = () => {
        this.props.getUserDetail(localStorage.getItem('username'));
    }
    
    titleClass = ["row", classes.titleClass];
    buttonClass = ["row", classes.buttonClass];


    render () {

        let attachedClasses = ["container-fluid", classes.SideDrawer, classes.Close];

        if(this.props.open){
            attachedClasses = ["container-fluid", classes.SideDrawer, classes.Open];
        }

        return (
            <div className={attachedClasses.join(' ')} onClick={this.props.closed}>
                <div className={this.titleClass.join(' ')}>
                    <p>Vision</p>
                </div>
                <div className={this.buttonClass.join(' ')}>
                <NavLink to='/userProfile'><button onClick={this.userProfileHandler} className="btn btn-outline-secondary">My Profile</button></NavLink>
                </div>
                <div className={this.buttonClass.join(' ')}>
                    <button className="btn btn-outline-secondary">See Blogs</button>
                </div>
                <div className={this.buttonClass.join(' ')}>
                    <NavLink to='/choose'><button className="btn btn-outline-secondary">Create Blog</button></NavLink>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        blogCategory: state.auth.blogCategory
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getUserDetail: (userId) => dispatch(actions.getDetailsAction(userId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SideDrawer);