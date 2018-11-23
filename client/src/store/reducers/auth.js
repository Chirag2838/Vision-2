import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    token: null,
    username: null,
    email: null
}

const signupUserReducer = (state, action) => {
    console.log('token State', action.token);
    console.log('email', action.email);
    console.log('username', action.username);
    return updateObject(state, {token: action.token, email: action.email, username: action.username});
}

const signinUserReducer = (state, action) => {
    console.log('token State', action.token);
    console.log('email', action.email);
    console.log('username', action.username);
    return updateObject(state, {token: action.token, email: action.email, username: action.username});
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.SIGNUP_SUCCESS: return signupUserReducer(state, action);
        case actionTypes.SIGNIN_SUCCESS: return signinUserReducer(state, action);
        default: return state;
    }
}

export default reducer;