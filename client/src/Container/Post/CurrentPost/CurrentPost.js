import React, { Component } from 'react';
import classes from './CurrentPost.css';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions';

class CurrentPost extends Component {
    
    state = {
        value: '',
        done: false
    }

    inputHandler = event => {
        let value = this.state.value;
        value = event.target.value;
        this.setState({value: value});
    }

    componentDidMount () {
        console.log('abc')
        this.props.workDone();
    }

    addComment = () => {
        console.log('fun', this.props.postOne._id);
        this.setState({done: true});
        this.props.addCommentNow(this.props.postOne._id, this.state.value);
    }

    posttitle = ["card-title", classes.posttitle];
    postCntnt = ["card-text", classes.postCntnt];

    render () {

        let newComment = null;

        if (this.state.done) {
            newComment = <li class="list-group-item"><span className={classes.usernameStyle}>{localStorage.getItem('username')}</span>: <span className={classes.commentStyle}>{this.state.value}</span></li>
        }
        
        // console.log(this.props.postOne.comment);

        let comments = null;

        comments = (
            <div>
                {this.props.postOne.comments.map(comment => {
                    return (
                        <li key={comment._id} class="list-group-item"><span className={classes.usernameStyle}>{comment.username}</span>: <span className={classes.commentStyle}>{comment.comment}</span></li>
                    )
                })}
                {newComment}
            </div>
        )

        // console.log(this.props.postOne);
        return (
            <div className={classes.mainDiv}>
                <div className="card" style={{width: '40rem'}}>
                    <div class="card-body">
                        <h5 className={this.posttitle.join(' ')}>{this.props.postOne.postTitle}</h5>
                        <p className={this.postCntnt.join(' ')}>{this.props.postOne.postContent}</p>
                    </div>
                    <ul class="list-group list-group-flush">
                        {comments}
                    </ul>
                    <div class="card-body">
                        <div class="input-group mb-3">
                            <input onChange={(event) => this.inputHandler(event)} type="text" class="form-control" placeholder="Add your comment" aria-label="Recipient's username" aria-describedby="basic-addon2" />
                            <div class="input-group-append">
                                <button onClick={this.addComment} class="btn btn-outline-secondary" type="button">Comment</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        postOne: state.post.postOne
    }
}

const mapDispatchToProps = dispatch => {
    return {
        workDone: () => dispatch(actions.fetchOneDone()),
        addCommentNow: (postId, comment) => dispatch(actions.addCommentAction(postId, comment))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CurrentPost);