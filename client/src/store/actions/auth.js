import * as actionTypes from './actionTypes';
import axios from 'axios';

export const signupSuccess = (token, email, username, userId, message) => {
    return {
        type: actionTypes.SIGNUP_SUCCESS,
        token: token,
        email: email,
        username: username,
        userId: userId,
        message: message
    }
}

export const signinSuccess = (token, email, username, userId, message) => {
    return {
        type: actionTypes.SIGNIN_SUCCESS,
        token: token,
        email: email,
        username: username,
        userId: userId,
        message: message
    }
}

export const logout = () => {
	localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('email');
    localStorage.removeItem('username');
	return {
		type: actionTypes.AUTH_LOGOUT
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
                console.log('response', response);
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('username', response.data.username);
                localStorage.setItem('userId', response.data.userId);
                localStorage.setItem('email', response.data.email);
                dispatch(signupSuccess(
                    response.data.token, 
                    response.data.email, 
                    response.data.username, 
                    response.data.userId,
                    response.data.message
                ));
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
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('username', response.data.username);
            localStorage.setItem('userId', response.data.userId);
            localStorage.setItem('email', response.data.email);
            dispatch(signinSuccess(
                response.data.token, 
                response.data.email, 
                response.data.username, 
                response.data.userId,
                response.data.message
            ));
        })
        .catch(error => {
            console.log(error);
        })
    }
}

export const checkAuthState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if (!token) {
            dispatch(logout());
        }
        else {
            const username = localStorage.getItem('username');
            const userId = localStorage.getItem('userId');
            const email = localStorage.getItem('email');
            dispatch(signinSuccess(token, email, username, userId));
        }
    }
}