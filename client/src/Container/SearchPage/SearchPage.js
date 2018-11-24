import React, { Component } from 'react';
import classes from './SearchPage.css';
import * as actions from '../../store/actions';
import { connect } from 'react-redux';

class SearchPage extends Component {

    componentDidMount () {
        console.log(this.props.value);
        this.props.findUsers(this.props.value);
    }

    render () {
        return (
            <div>

            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        value: state.search.value
    }
}

const mapDispatchToProps = dispatch => {
    return {
        findUsers: (value) => dispatch(actions.findUsersAction(value))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage);