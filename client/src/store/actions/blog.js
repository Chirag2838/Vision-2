import * as actionTypes from './actionTypes';
import axios from 'axios';

export const showMessage = (message, success) => {
    return {
        type: actionTypes.BLOG_MESSAGE,
        message: message,
        success: success
    }
}

export const saveMyBlogPost = blogPosts => {
    return {
        type: actionTypes.MY_BLOGPOSTS,
        blogPosts: blogPosts
    }
}

export const categoryToState = category => {
    return {
        type: actionTypes.ADD_CATEGORY,
        blogCategory: category
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
            localStorage.setItem('blogCategory', category);
            dispatch(categoryToState(category));
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
            console.log('response', response.data);
            if (response.data.success) {
                dispatch(saveMyBlogPost(response.data.blogPosts));
            }
            else {
                console.log(response.data.message);
                dispatch(showMessage(response.data.message, response.data.success));
            }
        }).catch(error => {
            console.log(error);
        })
    }
}