import * as actionTypes from './actionTypes';
import axios from 'axios';

export const postAndDetail = (posts, user) => {
    return {
        type: actionTypes.DETAILS,
        posts: posts,
        user: user
    }
}

export const getDetailsAction = userId => {
    console.log('dispatching', userId);
    return dispatch => {
        axios.get('api/' + userId)
            .then(response => {
                console.log(response.data);
                dispatch(postAndDetail(response.data.posts, response.data.user));
            }).catch(error => {
                console.log(error);
            })
    }
}