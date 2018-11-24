import * as actionTypes from './actionTypes';
import axios from 'axios';

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