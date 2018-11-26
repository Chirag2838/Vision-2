import React, { Component } from 'react';
import classes from './NewPost.css';
import * as actions from '../../../store/actions';
import { connect } from 'react-redux';

class NewPost extends Component {

    state = {
        newPostForm: {
            title: {
                value: '',
                required: true,
                valid: false
            },
            content: {
                value: '',
                required: true,
                valid: false
            }
        },
        formIsValid: false
    }

    
    newPostHandler = (event) => {
        event.preventDefault();
        const data = {};
        for(let formElement in this.state.newPostForm) {
            data[formElement] = this.state.newPostForm[formElement].value;
        }

        data.author = this.props.userId
        data.username = this.props.username
        console.log('data for post', data);
        this.props.addNewPost(data);

        this.props.history.push('/homepage');
    }

    checkValidity(value, rules) {
        let isValid = true;

        if(rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        console.log('isValid', isValid);

        return isValid;
    }

    inputHandler = (event, inputIdentifier) => {
        // console.log(inputIdentifier);
        const updateNewPostForm = {
            ...this.state.newPostForm
        }

        const updateNewPostElement = {
            ...updateNewPostForm[inputIdentifier]
        }

        // console.log(updateSigninElement);

        updateNewPostElement.value = event.target.value;
        updateNewPostElement.valid = this.checkValidity(updateNewPostElement.value, updateNewPostElement);
        updateNewPostForm[inputIdentifier] = updateNewPostElement;
        // console.log('valid', updateSigninForm[inputIdentifier].valid)
        let formIsValid = true;
        for(let inputIdentifier in updateNewPostForm) {
            formIsValid = updateNewPostForm[inputIdentifier].valid && formIsValid;
        }
        // console.log('var', formIsValid);

        this.setState({newPostForm: updateNewPostForm, formIsValid: formIsValid});
        // console.log(this.state.signinForm[inputIdentifier].valid);
        // console.log(this.state.formIsValid);
    }

    headClass = ["col-md-6 offset-md-3", classes.heading, classes.paddClass];
    textareaClass1 = ["form-group", classes.paddClass];
    textareaClass2 = ["form-group", classes.paddClass];
    textareahead = ["form-control z-depth-1", classes.boldhead];
    containerClass = ["container-fluid", classes.containerClass];

    render () {
        return (
            <div className={this.containerClass.join(' ')}>
                <div className={classes.mainClass}>
                    <div className="row">
                        <div className={this.headClass.join(' ')}>
                            <p>Create A Post</p>
                        </div>
                    </div>
                
                    <div className="row">
                        <div className="col-md-6 offset-md-3 shadow-textarea">
                            <form onSubmit={this.newPostHandler}>
                                <div className={this.textareaClass1.join(' ')}>
                                    <textarea 
                                        onChange = {(event) => this.inputHandler(event, 'title')}
                                        className= {this.textareahead.join(' ')}
                                        id="exampleFormControlTextarea6" 
                                        rows="1" 
                                        placeholder="Add your Title">
                                    </textarea>
                                </div>
                                <div className={this.textareaClass2.join(' ')}>
                                    <textarea 
                                        onChange = {(event) => this.inputHandler(event, 'content')}
                                        className="form-control z-depth-1" 
                                        id="exampleFormControlTextarea6" 
                                        rows="6" 
                                        placeholder="Write Something...">
                                    </textarea>
                                </div>
                                <div>
                                    <button disabled={!this.state.formIsValid} className="btn btn-info">Post Now</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        userId: state.auth.userId,
        username: state.auth.username
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addNewPost: (data) => dispatch(actions.newPostAction(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewPost);