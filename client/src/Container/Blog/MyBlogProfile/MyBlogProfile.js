import React, { Component } from 'react';
import classes from './MyBlogProfile.css';
import * as actions from '../../../store/actions';
import { connect } from 'react-redux';
import Spinner from '../../../Component/UI/Spinner/Spinner';

class MyBlogProfile extends Component {

    // componentDidMount () {
    //     console.log('calling function')
        // this.props.getAllBlogPost(this.props.username);
    // }

    // componentDidUpdate (prevProps) {
    //     console.log(prevProps);
    //     if (prevProps.username !== this.props.username || prevProps.blogPosts !== this.props.blogPosts) {
    //         this.props.getAllBlogPost(this.props.username);
    //     }
    // }

    // componentWillReceiveProps(newProps) {
    //     console.log('fn calling');
    //     console.log('this.props', this.props);
    //     console.log(newProps);
    //     if(this.props.username !== newProps) {
    //         this.props.getAllBlogPost(newProps.username);
    //     }
    // }

    pClass =["card-text", classes.pClass];
    titleClass = ["card-title", classes.titleClass];
    mainHead = ["container-fluid", classes.mainHead];
    postGrid = ["row", classes.postGrid];
    posttitle = ["card-title", classes.posttitle];
    postCntnt = ["card-text", classes.postCntnt];

    render () {

        if (this.props.username == null || this.props.blogPosts == null) {
            return <Spinner />
        }

        return (
            <div className={this.mainHead.join(' ')}>
                <div>
                    <div class="card text-white bg-dark mb-3" style={{maxWidth: "100%", textAlign: "center"}}>
                        <div class="card-body">
                            <h5 class={this.titleClass.join(' ')}>TECHNOLOGY</h5>
                            <p className={this.pClass.join(' ')}>A Blog created by Chirag123</p>
                        </div>
                    </div>
                </div>
                <div>
                    <div>
                        {this.props.blogPosts.map(allPost => {
                            return (
                                <div key={allPost._id} class="card bg-light mb-3" style={{maxWidth: "50rem", marginLeft: "18em", marginTop: "6em"}}>
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
                                        <button type="button" className="btn btn-outline-info btn-sm">
                                            Like
                                        </button>
                                        <button type="button" class="btn btn-outline-info btn-sm" style={{marginLeft: "2em"}} >
                                            Comment
                                        </button>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        username: state.auth.username,
        blogPosts: state.blog.blogPosts
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getAllBlogPost: (username) => dispatch(actions.blogPostsByUsername(username))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyBlogProfile);