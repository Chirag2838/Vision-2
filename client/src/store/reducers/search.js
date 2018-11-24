import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    value: null,
    usersList: null
}

const searchReducer = (state, action) => {
    console.log('reducer value', action.value);
    return updateObject(state, {value: action.value});
}

const findUsersReducer = (state, action) => {
    console.log('usersList Reducer', action.usersList);
    return updateObject(state, {usersList: action.usersList})
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.SEARCH_USER: return searchReducer(state, action);
        case actionTypes.FIND_USER: return findUsersReducer(state, action);
        default: return state;
    }
}

export default reducer;