import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    postId: null,
    posts: null,
    postOne: null,
    postOneBol: false
}

const fetchPostSuccess = (state, action) => {
    console.log('making it false');
    return updateObject(state, {postOneBol: false});
}

const fetchPostReducer = (state, action) => {
    console.log('red', action.postOne);
    return updateObject(state, {postOne: action.postOne, postOneBol: true});
}

const newPostReducer = (state, action) => {
    return updateObject(state, {postId: action.postId});
}

const getAllPostsReducer = (state, action) => {
    console.log('reducer', action.posts);
    return updateObject(state, {posts: action.posts});
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.POST_ADD_SUCCESS: return newPostReducer(state, action);
        case actionTypes.POST_ALL_SUCCESS: return getAllPostsReducer(state, action);
        case actionTypes.POST_FETCHED: return fetchPostReducer(state, action);
        case actionTypes.FETCH_POST_SUCCESS: return fetchPostSuccess(state, action);
        default: return state;
    }
}

export default reducer;