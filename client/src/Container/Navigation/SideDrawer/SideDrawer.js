import React from 'react';
import classes from './SideDrawer.css';

const SideDrawer = props => {

    let attachedClasses = ["container-fluid", classes.SideDrawer, classes.Close];
    const titleClass = ["row", classes.titleClass];
    const buttonClass = ["row", classes.buttonClass];

    if(props.open){
        attachedClasses = ["container-fluid", classes.SideDrawer, classes.Open];
    }

    return (
        <div className={attachedClasses.join(' ')} onClick={props.closed}>
            <div className={titleClass.join(' ')}>
                <p>Vision</p>
            </div>
            <div className={buttonClass.join(' ')}>
                <button className="btn btn-outline-secondary">My Profile</button>
            </div>
            <div className={buttonClass.join(' ')}>
                <button className="btn btn-outline-secondary">See Blogs</button>
            </div>
            <div className={buttonClass.join(' ')}>
                <button className="btn btn-outline-secondary">Followers</button>
            </div>
            <div className={buttonClass.join(' ')}>
                <button className="btn btn-outline-secondary">Following</button>
            </div>
        </div>
    )
}

export default SideDrawer;