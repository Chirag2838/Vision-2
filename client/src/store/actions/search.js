import * as actionTypes from './actionTypes';
import axios from 'axios';

export const findUsersSuccess = usersList => {
    return {
        type: actionTypes.FIND_USER,
        usersList: usersList
    }
}

export const searchAction = value => {
    console.log('action value', value)
    return {
        type: actionTypes.SEARCH_USER,
        value: value
    }
}

export const findUsersAction = value => {
    console.log('action', value);
    return dispatch => {
        axios({
            method: 'post',
            url: 'api/searchpeople',
            headers: {
                'crossDomain': true,
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: value
        }).then(response => {
            console.log('response', response.data.usersList);
            dispatch(findUsersSuccess(response.data.usersList));
        }).catch(error => {
            console.log(error);
        })
    }
}