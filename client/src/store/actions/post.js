import * as actionTypes from './actionTypes';
import axios from 'axios';

export const fetchOneDone = () => {
    console.log('confirming in the action');
    return {
        type: actionTypes.FETCH_POST_SUCCESS
    }
}

export const fetchOne = postOne => {
    return {
        type: actionTypes.POST_FETCHED,
        postOne: postOne
    }
}

export const newPostDone = postId => {
    return {
        type: actionTypes.POST_ADD_SUCCESS,
        postId: postId
    }
}

export const allPosts = posts => {
    return {
        type: actionTypes.POST_ALL_SUCCESS,
        posts: posts
    }
}

export const newPostAction = data => {
    return dispatch => {
        axios({
            method: 'post',
            url: 'api/posts',
            headers: {
                'crossDomain': true,
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: data
        }).then(response => {
            console.log(response.data);
            dispatch(newPostDone(response.data._id));
        })
    }
}

export const getAllPostsAction = () => {
    return dispatch => {
        axios.get('api/posts')
            .then(response => {
                console.log(response.data.posts);
                dispatch(allPosts(response.data.posts));
            }).catch(error => {
                console.log(error);
            })
    }
}

export const fetchPostAction = (postId) => {
    return dispatch => {
        axios.get('api/posts/' + postId)
        .then(response => {
            console.log(response.data);
            dispatch(fetchOne(response.data));
        }).catch(error => {
            console.log(error);
        })
    }
}

export const addCommentAction = (postId, comment) => {
    return dispatch => {
        const url = 'api/posts/' + postId + '/comments';
        axios({
            method: 'post',
            url: url,
            headers: {
                'crossDomain': true,
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: {
                username: localStorage.getItem('username'),
                comment: comment
            }
        }).then(response => {
            console.log(response);
        }).catch(error => {
            console.log(error);
        })
    }
}
