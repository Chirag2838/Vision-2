import React, { Component } from 'react';
import Aux from '../../hoc/Aux/Aux';

class Auth extends Component {

    mainHeading = ["row", classes.mainHeading];

    render () {
        return (
            <Aux>
                <div className="container-fluid">
                    <div className="row">
                        <h1>VISION</h1>
                    </div>
                    <div className="row">
                        <h3>A greatest platform for all kind of writers. Start blogging on your favorite topic.</h3>
                    </div>
                    <div className="row">
                        <div className="col-md-3 offset-md-4">
                            <button>
                                SIGN IN
                            </button>
                        </div>
                        <div className="col-md-3">
                            <button>
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