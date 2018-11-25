import React, { Component } from 'react';
import classes from './Signup.css';
import * as actions from '../../../store/actions';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';


class Signup extends Component {

    state = {
        signupForm: {
            firstname: {
                value: '',
                required: true,
                valid: false
            },

            lastname: {
                value: '',
                valid: false,
                required: true
            },

            username: {
                value: '',
                valid: false,
                required: true
            },

            email: {
                value: '',
                valid: false,
                required: true
            },

            pass1: {
                value: '',
                valid: false,
                required: true
            },

            pass2: {
                value: '',
                valid: false,
                required: true
            }
        },

        formIsValid: false
    }

    signupHandler = (event) => {
        event.preventDefault();
        const data = {};
        for (let formElement in this.state.signupForm) {
            data[formElement] = this.state.signupForm[formElement].value;
        }
        console.log('signuphandler is fine');
        // console.log('data', data);
        this.props.onSignup(data);
    }

    checkValidity(value, rules) {
        let isValid = true;

        if(rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        console.log('checkValidity is fine');

        return isValid;
    }

    inputHandler = (event, inputIdentifier) => {

        console.log(inputIdentifier);
        const updateSignupForm = {
            ...this.state.signupForm
        }

        const updateSignupElement = {
            ...updateSignupForm[inputIdentifier]
        }

        console.log(updateSignupElement);

        updateSignupElement.value = event.target.value;
        updateSignupElement.valid = this.checkValidity(updateSignupElement.value, updateSignupElement);
        updateSignupForm[inputIdentifier] = updateSignupElement;
        let formIsValid = true;
        for(let inputIdentifier in updateSignupForm) {
            formIsValid = updateSignupForm[inputIdentifier].valid && formIsValid;
        }
        // console.log(formIsValid);

        this.setState({signupForm: updateSignupForm, formIsValid: formIsValid});
        console.log(this.state.signupForm[inputIdentifier].valid);
        console.log(this.state.formIsValid);
    }

    formContent = ['col-md-4 offset-md-4', classes.formContent];
    mainClass = ['container-fluid', classes.mainClass];

    render () {

        let message = null;
        if (this.props.token !== null) {
            return <Redirect to='/homepage' />
        }
        else {
            message = <div className={classes.message}>{this.props.message}</div>
        }

        return (
            <div className={this.mainClass.join(' ')}>
                <div className="row">
                    <div className={this.formContent.join(' ')}>
                        <form onSubmit={this.signupHandler}>
                            <div className="form-group">
                                <p>Hey! Signup to share your writeups</p>
                            </div>
                            {message}
                            <div className="form-group">
                                <input onChange={(event) => this.inputHandler(event, 'firstname')} className="form-control" placeholder="Firstname" type="text" />
                            </div>
                            <div className="form-group">
                                <input onChange={(event) => this.inputHandler(event, 'lastname')} className="form-control" placeholder="Lastname" type="text" />
                            </div>
                            <div className="form-group">
                                <input onChange={(event) => this.inputHandler(event, 'email')} className="form-control" placeholder="Email" type="email" />
                            </div>
                            <div className="form-group">
                                <input onChange={(event) => this.inputHandler(event, 'username')} className="form-control" placeholder="Username" type="text" />
                            </div>
                            <div className="form-group">
                                <input onChange={(event) => this.inputHandler(event, 'pass1')} className="form-control" placeholder="Password" type="password" />
                            </div>
                            <div className="form-group">
                                <input onChange={(event) => this.inputHandler(event, 'pass2')} className="form-control" placeholder="Re-Type Password" type="password" />
                            </div>
                            <div>
                                <button className="btn btn-info" disabled={!this.state.formIsValid}>Continue</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        token: state.auth.token,
        message: state.auth.message
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onSignup: (data) => dispatch(actions.signupUser(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup);