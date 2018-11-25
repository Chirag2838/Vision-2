import React, { Component } from 'react';
import Aux from '../../hoc/Aux/Aux';
import classes from './Auth.css';

class Auth extends Component {

    signInHandler = () => {
        this.props.history.push('/signin');
    }

    signUpHandler = () => {
        this.props.history.push('/signup');
    }

    mainHeading = ["row", classes.mainHeading];
    details = ["row", classes.details];
    btns = ["row", classes.btns];
    background = ["container-fluid", classes.background];

    render () {
        return (
            <Aux>
                <div className={this.background.join(' ')}>
                    <div className={this.mainHeading.join(' ')}>
                        <p>VISION</p>
                    </div>
                    <div className={this.details.join(' ')}>
                        <p>A greatest platform for all kind of writers. Start blogging on your favorite topic.</p>
                    </div>
                    <div className={this.btns.join(' ')}>
                        <div className="col-md-3 offset-md-4">
                            <button onClick={this.signInHandler} className="btn btn-success btn-lg">
                                SIGN IN
                            </button>
                        </div>
                        <div className="col-md-3">
                            <button onClick={this.signUpHandler} className="btn btn-danger btn-lg">
                                SIGN UP
                            </button>
                        </div>
                    </div>
                </div>
            </Aux>
        )
    }
}

export default Auth;