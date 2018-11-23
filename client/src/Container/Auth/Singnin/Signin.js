import React, { Component } from 'react';
import classes from './Signin.css';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions';

class Signin extends Component {

    state = {
        signinForm: {
            id: {
                value: '',
                required: true,
                valid: false
            },
            password: {
                value: '',
                required: true,
                valid: false
            }
        },
        formIsValid: false
    }

    signinHandler = (event) => {
        event.preventDefault();
        const data = {};
        for(let formElement in this.state.signinForm) {
            data[formElement] = this.state.signinForm[formElement].value;
        }
        console.log('signin function', data);
        this.props.onSignin(data);
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
        const updateSigninForm = {
            ...this.state.signinForm
        }

        const updateSigninElement = {
            ...updateSigninForm[inputIdentifier]
        }

        console.log(updateSigninElement);

        updateSigninElement.value = event.target.value;
        updateSigninElement.valid = this.checkValidity(updateSigninElement.value, updateSigninElement);
        updateSigninForm[inputIdentifier] = updateSigninElement;
        console.log('valid', updateSigninForm[inputIdentifier].valid)
        let formIsValid = true;
        for(let inputIdentifier in updateSigninForm) {
            formIsValid = updateSigninForm[inputIdentifier].valid && formIsValid;
        }
        console.log('var', formIsValid);

        this.setState({signinForm: updateSigninForm, formIsValid: formIsValid});
        console.log(this.state.signinForm[inputIdentifier].valid);
        console.log(this.state.formIsValid);
    }

    mainClass = ['container-fluid', classes.mainClass];
    formContent = ['col-md-4 offset-md-4', classes.formContent];

    render () {
        return (
            <div className={this.mainClass.join(' ')}>
                <div className="row">
                    <div className={this.formContent.join(' ')}>
                        <form onSubmit={this.signinHandler}>
                            <div>
                                <p>Sigin to continue</p>
                            </div>
                            <div className="form-group">
                                <input onChange={(event) => this.inputHandler(event, 'id')} className="form-control" placeholder="Username or Email" type="text" />
                            </div>
                            <div className="form-group">
                                <input onChange={(event) => this.inputHandler(event, 'password')} className="form-control" placeholder="Password" type="password" />
                            </div>
                            <div>
                                <button disabled={!this.state.formIsValid} className="btn btn-info">Continue</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onSignin: (data) => dispatch(actions.signinUser(data))
    }
}

export default connect(null, mapDispatchToProps)(Signin);