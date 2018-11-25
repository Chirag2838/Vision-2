import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    token: null,
    username: null,
    email: null,
    userId: null,
    message: '',
    blogCategory: null
}

const logoutReducer = (state, action) => {
    return updateObject(state, {token: null, email: null, userId: null, username: null, blogCategory: null});
}

const signupUserReducer = (state, action) => {
    console.log('token State', action.token);
    console.log('email', action.email);
    console.log('username', action.username);
    console.log('userId', action.userId);
    
    return updateObject(state, {
        token: action.token, 
        email: action.email, 
        username: action.username, 
        userId: action.userId, 
        message: action.message,
        blogCategory: action.blogCategory
    });
}

const signinUserReducer = (state, action) => {
    console.log('token State', action.token);
    console.log('email', action.email);
    console.log('username', action.username);
    console.log('userId', action.userId);
    console.log('rechecking', action.blogCategory);
    return updateObject(state, {
        token: action.token, 
        email: action.email, 
        username: action.username, 
        userId: action.userId, 
        message: action.message,
        blogCategory: action.blogCategory
    });
}

const addCatReducer = (state, action) => {
    console.log('cat', action.blogCategory);
    return updateObject(state, {blogCategory: action.blogCategory});
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.SIGNUP_SUCCESS: return signupUserReducer(state, action);
        case actionTypes.SIGNIN_SUCCESS: return signinUserReducer(state, action);
        case actionTypes.AUTH_LOGOUT: return logoutReducer(state, action);
        case actionTypes.ADD_CATEGORY: return addCatReducer(state, action);
        default: return state;
    }
}

export default reducer;