import * as actionTypes from './actionTypes';
import axios from 'axios';

export const signupSuccess = (token, email, username, userId) => {
    return {
        type: actionTypes.SIGNUP_SUCCESS,
        token: token,
        email: email,
        username: username,
        userId: userId
    }
}

export const signinSuccess = (token, email, username, userId) => {
    return {
        type: actionTypes.SIGNIN_SUCCESS,
        token: token,
        email: email,
        username: username,
        userId: userId
    }
}

export const signupUser = data => {
    console.log('data', data);
    return dispatch => {
        axios({
            method: 'post',
            url: 'api/signup',
            headers : {
                'crossDomain': true,
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: data
        }).then(response => {
                console.log('response', response.email);
                dispatch(signupSuccess(response.data.token, response.data.email, response.data.username, response.data.userId));
            })
            .catch(error => {
                console.log(error);
            })
    }
}

export const signinUser = data => {
    return dispatch => {
        axios({
            method: 'post',
            url: 'api/signin',
            headers: {
                'crossDomain': true,
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: data
        }).then(response => {
            console.log('response', response.data.token);
            dispatch(signinSuccess(response.data.token, response.data.email, response.data.username, response.data.userId));
        })
        .catch(error => {
            console.log(error);
        })
    }
}