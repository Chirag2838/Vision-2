import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    posts: null,
    user: null
}

const getAll = (state, action) => {
    console.log('red.', action.posts);
    console.log('red.', action.user);
    return updateObject(state, {posts: action.posts, user: action.user})
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.DETAILS: return getAll(state, action);
        default: return state;
    }
}

export default reducer;