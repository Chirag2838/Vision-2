import React, { Component } from 'react';
import Spinner from '../../Component/UI/Spinner/Spinner';
import classes from './UserProfile.css';
import { connect } from 'react-redux';

class UserProfile extends Component {

    state = {
        followClicked : false,
        value: 'Follow'
    }

    followClick = () => {

        let likeValue = null;

        if (this.state.value === 'Follow') {
            likeValue = 'Unfollow'
        }
        else {
            likeValue = 'Follow'
        }

        this.setState(prevState => {
            return ({followClicked: !prevState.followClick, value: likeValue})
        })

        console.log(this.state.value);
    }

    postGrid = ["row", classes.postGrid];
    posttitle = ["card-title", classes.posttitle];
    postCntnt = ["card-text", classes.postCntnt];
    followBtn = "btn btn-outline-info btn-sm"

    containerClass = ["container-fluid", classes.containerClass];
    render () {

        if (this.props.posts == undefined) {
            return <Spinner />
        }

        if (this.state.value === 'Unfollow') {
            this.followBtn = "btn btn-outline-secondary btn-sm"
        }
        else {
            this.followBtn = "btn btn-outline-info btn-sm"
        }

        let button = null;

        if(this.props.user._id !== localStorage.getItem('userId')) {
            button = <button onClick={this.followClick} className={this.followBtn}>{this.state.value}</button>
        }

        let postMap = (
            <div>
                {this.props.posts.map(allPost => {
                    return (
                        <div key={allPost._id} class="card bg-light mb-3" style={{width: "50rem", marginLeft: "14em", marginTop: "6em"}}>
                            <div className="card-header">
                                <div className={classes.usernameText}>
                                    {allPost.username}
                                </div>
                                <div className={classes.dateStyle}>
                                    {allPost.postDate}
                                </div>
                            </div>
                            <div className="card-body">
                                <h5 className={this.posttitle.join(' ')}>{allPost.postTitle}</h5>
                                <p className={this.postCntnt.join(' ')}>{allPost.postContent}</p>
                                {/* <button type="button" className="btn btn-outline-info btn-sm">
                                    Like
                                </button>
                                <button onClick={() => this.commentClick(allPost._id)} type="button" class="btn btn-outline-info btn-sm" style={{marginLeft: "2em"}} >
                                    Comment
                                </button> */}
                            </div>
                        </div>
                    )
                })}
            </div>
        )

        return (
            <div className={this.containerClass.join(' ')}>
                <div className="row">
                    <div className="col-md-3 offset-2">
                        <span className = {classes.usernameStyle}>{this.props.user.firstname} {this.props.user.lastname}</span>
                    </div>
                    <div className="col-md-4 offset-1">
                        <span className={classes.followFollowing}>{this.props.user.following.length} Followings  {this.props.user.followers.length} Followers</span>
                    </div>
                    <div className="col-md-2">
                        {button}
                    </div>
                </div>
                <div className="row">
                    {postMap}
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        posts: state.user.posts,
        user: state.user.user
    }
}

export default connect(mapStateToProps)(UserProfile);