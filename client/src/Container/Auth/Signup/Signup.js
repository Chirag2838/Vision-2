import React, { Component } from 'react';
import classes from './Signup.css';


class Signup extends Component {

    formContent = ['col-md-4 offset-md-4', classes.formContent];
    mainClass = ['container-fluid', classes.mainClass];

    render () {
        return (
            <div className={this.mainClass.join(' ')}>
                <div className="row">
                    <div className={this.formContent.join(' ')}>
                        <form>
                            <div className="form-group">
                                <p>Hey! Signup to share your writeups</p>
                            </div>
                            <div className="form-group">
                                <input className="form-control" placeholder="Firstname" type="text" />
                            </div>
                            <div className="form-group">
                                <input className="form-control" placeholder="Lastname" type="text" />
                            </div>
                            <div className="form-group">
                                <input className="form-control" placeholder="Email" type="email" />
                            </div>
                            <div className="form-group">
                                <input className="form-control" placeholder="Username" type="text" />
                            </div>
                            <div className="form-group">
                                <input className="form-control" placeholder="Password" type="password" />
                            </div>
                            <div className="form-group">
                                <input className="form-control" placeholder="Re-Type Password" type="password" />
                            </div>
                            <div>
                                <button className="btn btn-info">Continue</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default Signup;