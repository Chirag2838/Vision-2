import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    value: null
}

const searchReducer = (state, action) => {
    console.log('reducer value', action.value);
    return updateObject(state, {value: action.value});
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.SEARCH_USER: return searchReducer(state, action);
        default: return state;
    }
}

export default reducer;