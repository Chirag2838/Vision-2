import * as actionTypes from './actionTypes';
import axios from 'axios';

export const saveMyBlogPost = blogPosts => {
    return {
        type: actionTypes.MY_BLOGPOSTS,
        blogPosts: blogPosts
    }
}

export const addCategoryAction = (username, category) => {
    return dispatch => {
        axios({
            method: 'post',
            url: 'api/blog/category',
            headers : {
                'crossDomain': true,
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: {
                username: username,
                category: category
            }
        }).then(response => {
            console.log(response);
        }).catch(error => {
            console.log(error);
        })
    }
}

export const blogPostsByUsername = username => {
    return dispatch => {
        axios({
            method: 'post',
            url: 'api/blog/postByUsername',
            headers : {
                'crossDomain': true,
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: username
        }).then(response => {
            console.log('response', response.data.blogPosts);
            dispatch(saveMyBlogPost(response.data.blogPosts));
        }).catch(error => {
            console.log(error);
        })
    }
}