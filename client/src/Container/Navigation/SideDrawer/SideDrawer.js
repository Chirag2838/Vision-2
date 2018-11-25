import React, { Component } from 'react';
import classes from './SideDrawer.css';
import { Redirect } from 'react-router-dom';

class SideDrawer extends Component {

    state = {
        createBlog: false
    }

    createBlogHandler = () => {
        this.setState({createBlog: true});
    }

    
    titleClass = ["row", classes.titleClass];
    buttonClass = ["row", classes.buttonClass];


    render () {

        let attachedClasses = ["container-fluid", classes.SideDrawer, classes.Close];

        if(this.props.open){
            attachedClasses = ["container-fluid", classes.SideDrawer, classes.Open];
        }

        if (this.state.createBlog) {
            return <Redirect to='/choose' />
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
                <div onClick={this.createBlogHandler} className={this.buttonClass.join(' ')}>
                    <button className="btn btn-outline-secondary">Create Blog</button>
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

export default SideDrawer;