import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    postId: null
}

const newPostReducer = (state, action) => {
    return updateObject(state, {postId: action.postId});
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.POST_ADD_SUCCESS: return newPostReducer(state, action);
        default: return state;
    }
}

export default reducer;