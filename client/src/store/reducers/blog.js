import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    blogPosts: null,
    blogMessage: '',
    success: false
}

const getMyBPOSTReducer = (state, action) => {
    console.log('red. blogpost', action.blogPosts);
        return updateObject(state, {blogPosts: action.blogPosts});
}

const showBlogMsg = (state, action) => {
    console.log('red.', action.message);
    console.log('red.', action.success);
    return updateObject(state, {blogMessage: action.message, success: action.success});
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.MY_BLOGPOSTS: return getMyBPOSTReducer(state, action);
        case actionTypes.BLOG_MESSAGE: return showBlogMsg(state, action);
        default: return state;
    }
}

export default reducer;