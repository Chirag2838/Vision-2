import * as actionTypes from './actionTypes';
import axios from 'axios';

export const signupSuccess = (token, email, username) => {
    return {
        type: actionTypes.SIGNUP_SUCCESS,
        token: token,
        email: email,
        username: username
    }
}

export const signinSuccess = (token, email, username) => {
    return {
        type: actionTypes.SIGNIN_SUCCESS,
        token: token,
        email: email,
        username: username
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
                console.log('response', response.data);
                dispatch(signupSuccess(response.data.token, response.data.email, response.data.username));
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
            console.log('response', response.data);
            dispatch(signinSuccess(response.data.token, response.data.email, response.data.username));
        })
        .catch(error => {
            console.log(error);
        })
    }
}