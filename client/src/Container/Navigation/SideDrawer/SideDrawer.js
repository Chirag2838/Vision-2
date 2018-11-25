import React, { Component } from 'react';
import classes from './SideDrawer.css';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

class SideDrawer extends Component {
    
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
                    <button className="btn btn-outline-secondary">My Profile</button>
                </div>
                <div className={this.buttonClass.join(' ')}>
                    <button className="btn btn-outline-secondary">See Blogs</button>
                </div>
                <div className={this.buttonClass.join(' ')}>
                    <NavLink to='/choose'>Create Blog</NavLink>
                </div>
                <div className={this.buttonClass.join(' ')}>
                    <button className="btn btn-outline-secondary">Following</button>
                </div>
                <div className={this.buttonClass.join(' ')}>
                    <button className="btn btn-outline-secondary">Following</button>
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

export default connect(mapStateToProps)(SideDrawer);