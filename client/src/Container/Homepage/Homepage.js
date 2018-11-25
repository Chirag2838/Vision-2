import React, { Component } from 'react';
import classes from './Homepage.css';
import * as actions from '../../store/actions';
import { connect } from 'react-redux';
import Spinner from '../../Component/UI/Spinner/Spinner';

class Homepage extends Component {

    componentDidMount () {
        this.props.getAllPosts();
    }

    componentWillMount (prevProps) {
        console.log(prevProps)
        if (prevProps !== this.props.post) {
            this.props.getAllPosts();
        }
    }

    postGrid = ["row", classes.postGrid];
    posttitle = ["card-title", classes.posttitle];
    postCntnt = ["card-text", classes.postCntnt];

    render () {

        if(this.props.posts == null) {
            return <Spinner />
        }

        let postMap = (
            <div>
                {this.props.posts.map(allPost => {
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
        )

        return (
            <div>
                {postMap}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        posts: state.post.posts
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getAllPosts: () => dispatch(actions.getAllPostsAction())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Homepage);