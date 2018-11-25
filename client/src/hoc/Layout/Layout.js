import React, { Component } from 'react';
import Aux from '../Aux/Aux';
import Toolbar from '../../Container/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../Container/Navigation/SideDrawer/SideDrawer';
import { connect } from 'react-redux';

class Layout extends Component {

    // componentDidMount = () => {
    //     console.log('app.js', this.props);
    // }

    state = {
        showSideDrawer : false
    }

    sideDrawerHandler = () => {
        this.setState(prevState => {
            return {
                showSideDrawer: !prevState.showSideDrawer
            }
        })
    }

    closeSideDrawerHandler = () => {
        this.setState({showSideDrawer : false});
    }

    render () {

        let toolbar = null;
        if (this.props.isAuthenticated) {
            toolbar = <Toolbar toggle ={this.sideDrawerHandler} />
        }

        return (
            <Aux>
                {toolbar}

                <SideDrawer 
                    open = {this.state.showSideDrawer}
                    closed = {this.closeSideDrawerHandler} />

                <main>
                    {this.props.children}
                </main>
            </Aux>
        )
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    }
}

export default connect(mapStateToProps)(Layout);