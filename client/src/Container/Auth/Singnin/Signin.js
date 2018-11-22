import React, { Component } from 'react';
import classes from './Signin.css';

class Signin extends Component {

    mainClass = ['container-fluid', classes.mainClass];
    formContent = ['col-md-4 offset-md-4', classes.formContent];

    render () {
        return (
            <div className={this.mainClass.join(' ')}>
                <div className="row">
                    <div className={this.formContent.join(' ')}>
                        <form>
                            <div>
                                <p>Sigin to continue</p>
                            </div>
                            <div className="form-group">
                                <input className="form-control" placeholder="Username or Email" type="text" />
                            </div>
                            <div className="form-group">
                                <input className="form-control" placeholder="Password" type="password" />
                            </div>
                            <div>
                                <button className="btn btn-info">Continue</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default Signin;