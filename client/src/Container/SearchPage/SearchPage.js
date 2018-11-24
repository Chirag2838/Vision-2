import React, { Component } from 'react';
import classes from './SearchPage.css';
import * as actions from '../../store/actions';
import { connect } from 'react-redux';
import Spinner from '../../Component/UI/Spinner/Spinner';

class SearchPage extends Component {

    componentDidMount () {
        console.log('did mount', this.props.value);
        this.props.findUsers(this.props.value);
    }

    componentDidUpdate (prevProps) {
        if (prevProps.value !== this.props.value) {
            this.props.findUsers(this.props.value);
        }
    }

    mainClass = ["container-fluid", classes.mainClass];
    cards = ["row", classes.cards];

    render () {

        if (this.props.usersList == null) {
            return <Spinner />
        }

        let users = (
            <div className={this.mainClass.join(' ')}>
                {this.props.usersList.map(userList => {
                    return (
                        <div className={this.cards.join(' ')} key = {userList}>
                            <p>{userList}</p>
                        </div>
                    )
                })}
            </div>
        )

        return users
    }
}

const mapStateToProps = state => {
    return {
        value: state.search.value,
        usersList: state.search.usersList
    }
}

const mapDispatchToProps = dispatch => {
    return {
        findUsers: (value) => dispatch(actions.findUsersAction(value))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage);