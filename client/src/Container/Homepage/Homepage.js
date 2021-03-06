import React, { Component } from 'react';
import classes from './Homepage.css';
import * as actions from '../../store/actions';
import { connect } from 'react-redux';
import Spinner from '../../Component/UI/Spinner/Spinner';
import { Redirect } from 'react-router-dom';

class Homepage extends Component {

    state = {
        like: false,
        value: 'Like',
        id: null,
        liked: new Map()
    }

    componentDidMount () {
        this.props.getAllPosts();
    }

    // componentWillMount (prevProps) {
    //     console.log(prevProps.post)
    //     if (prevProps.post !== this.props.post) {
    //         this.props.getAllPosts();
    //     }
    // }

    likeHandler = (id) => {

        let likeValue = null;

        let likedPosts = this.state.liked;

        // let post = post.find(element => element.id == id)
        let post = likedPosts.get(id);

        if (!post) {
            likedPosts.set(id, true);
            console.log(likedPosts);
            this.setState({liked: likedPosts});
        } else {
            let value = likedPosts.get(id);
            value = !value
            likedPosts.set(id, value);
            this.setState({liked: likedPosts})
        }

        // this.setState(prevState => {
        //     return ({like: !prevState.like, value: likeValue})
        // })
    }

    commentClick = (postId) => {
        console.log(postId);
        this.props.fetchPost(postId);
    }

    postGrid = ["row", classes.postGrid];
    posttitle = ["card-title", classes.posttitle];
    postCntnt = ["card-text", classes.postCntnt];
    likeBtn = "btn btn-info btn-sm"
    unlikeBtn = "btn btn-outline-secondary btn-sm"

    render () {

        // if (this.state.value === 'Unlike') {
        //     this.likeBtn = "btn btn-outline-danger btn-sm"
        // }
        // else {
        //     this.likeBtn = "btn btn-outline-info btn-sm"
        // }
    

        if(this.props.posts == null) {
            return <Spinner />
        }

        console.log('homepage', this.props.postOneBol)

        // if(this.props.postOneBol == undefined) {
        //     return <Spinner />
        // }

        if(this.props.postOneBol){
            return <Redirect to='/currentPost' />
        }

        let postMap = (
            <div>
                {this.props.posts.map(allPost => {
                    console.log('state', this.state.liked.get(allPost._id));
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
                                <button onClick={() => this.likeHandler(allPost._id)} type="button" className={this.state.liked.get(allPost._id) ? this.likeBtn : this.unlikeBtn}>
                                    {this.state.liked.get(allPost._id) ? "Unlike" : "Like"}
                                </button>
                                <button onClick={() => this.commentClick(allPost._id)} type="button" class="btn btn-outline-info btn-sm" style={{marginLeft: "2em"}} >
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
        posts: state.post.posts,
        postOneBol: state.post.postOneBol
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getAllPosts: () => dispatch(actions.getAllPostsAction()),
        fetchPost: (postId) => dispatch(actions.fetchPostAction(postId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Homepage);