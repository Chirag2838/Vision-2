import React, {Component} from 'react';
import classes from './Toolbar.css';
import * as actions from '../../../store/actions';
import { connect } from 'react-redux';
// import { Redirect } from 'react-router';
import {NavLink} from 'react-router-dom';

class Toolbar extends Component {

    state = {
        value: '',
        valid: false,
        searchClicked: false
    }

    logoutNow = () => {
        this.props.onLogout();
    }

    searchHandler = () => {
        const sendValue = this.state.value;
        this.props.searchValue(sendValue); 
        console.log(this.props);
        this.setState({searchClicked: true});
    }

    inputHandler = (event) => {
        let value = this.state.value;
        value = event.target.value;
        console.log(value);
        let valid = false;
        if (value.length !== 0) {
            valid = true;
        }
        console.log('valid', valid);
        this.setState({value: value, valid: valid});
    }

    toolbarMain = ["row", classes.toolbarMain];
    visionClass = ["col-md-2 offset-md-1", classes.visionClass];
    searchClass = ["col-md-3 offset-md-1", classes.searchClass];
    btnClass1 = ["col-md-1", classes.btnClass];
    btnClass2 = ["col-md-1 offset-md-1", classes.btnClass];
    iconClass = ["fas fa-bars", classes.iconClass];
    searchButton = ["btn btn-outline-secondary", classes.searchButton];
    superMainClass = ["container-fluid", classes.superMainClass];

    render () {

        // if (this.state.searchClicked) {
        //     return <Redirect to='/search' />
        // }
        return (
            <div className={this.superMainClass.join(' ')}>
                <div className={this.toolbarMain.join(' ')}>
                    <div className="col-md-2">
                        <span onClick={this.props.toggle} className={this.iconClass.join(' ')}>
                        </span>
                    </div>
                    <div className={this.visionClass.join(' ')}>
                        <NavLink className={classes.visionClass} to='/homepage'>Vision</NavLink>
                    </div>
                    <div className={this.searchClass.join(' ')}>
                        <div className="input-group mb-3">
                            <input onChange={(event) => this.inputHandler(event)} type="text" className="form-control" placeholder="Name/Username" aria-label="Recipient's username" aria-describedby="basic-addon2" />
                            <div className="input-group-append">
                                <NavLink to="/search"><button className={this.searchButton.join(' ')} onClick={this.searchHandler} disabled={!this.state.valid} type="button">Search</button></NavLink>
                            </div>
                        </div>
                    </div>
                    <div className={this.btnClass1.join(' ')}>
                        <NavLink to='/NewPost'><button className="btn btn-outline-info">Create Post</button></NavLink>
                    </div>
                    <div className={this.btnClass2.join(' ')}>
                        <button className="btn btn-outline-secondary" onClick={this.logoutNow}>Logout</button>
                    </div>
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLogout: () => dispatch(actions.logout()),
        searchValue: (value) => dispatch(actions.searchAction(value))
    }
}

export default connect(null, mapDispatchToProps)(Toolbar);