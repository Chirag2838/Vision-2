import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    blogPosts: null
}

const getMyBPOSTReducer = (state, action) => {
    console.log('red. blogpost', action.blogPosts);
        return updateObject(state, {blogPosts: action.blogPosts});
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.MY_BLOGPOSTS: return getMyBPOSTReducer(state, action);
        default: return state;
    }
}

export default reducer;