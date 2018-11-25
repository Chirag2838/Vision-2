import React, { Component } from 'react';
import classes from './BlogCategory.css';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as actions from '../../../store/actions';

class blogCategory extends Component {

    state = {
        clicked: false
    }

    clickCategory = (clickedElement) => {
        console.log(clickedElement);
        this.props.addCategory(this.props.username, clickedElement);
        this.props.history.push('/MyBlogProfile');
    }

    headerClass = ["col-md-12", classes.heading];
    mainClass = ["col-md-6", "offset-md-3", classes.main]
    optsClass = ["col-md-3", "offset-md-1", classes.opts]
    optClass = [classes.opt]
    rowClass = ["row", classes.rowclass];

    render () {

        if (this.props.blogCategory !== undefined) {
            console.log(this.props.blogCategory);
            return <Redirect to='/MyBlogProfile' />
        }

        console.log(this.props.blogCategory);

        return (
            <div className={this.mainClass.join(' ')}>
                <div className="row">
                    <div className={this.headerClass.join(' ')}>
                        <h3>CHOOSE CATEGORY</h3>
                    </div>
                </div>
                <div className={this.optClass.join(' ')}>
                    <div className={this.rowClass.join(' ')}>
                        <div onClick={() => this.clickCategory('Technology')} className={this.optsClass.join(' ')}>
                            Technology
                        </div>
                        <div onClick={() => this.clickCategory('Politics')} className={this.optsClass.join(' ')}>
                            Politics
                        </div>
                        <div onClick={() => this.clickCategory('Fashion')} className={this.optsClass.join(' ')}>
                            Fashion
                        </div>
                    </div>
                   <div className={this.rowClass.join(' ')}>
                        <div onClick={() => this.clickCategory('Health')} className={this.optsClass.join(' ')}>
                            Health
                        </div>
                        <div onClick={() => this.clickCategory('Food')} className={this.optsClass.join(' ')}>
                            Food
                        </div>
                        <div onClick={() => this.clickCategory('Gaming')} className={this.optsClass.join(' ')}>
                            Gaming
                        </div>
                   </div>
                    <div className={this.rowClass.join(' ')}>
                        <div onClick={() => this.clickCategory('Poetry')} className={this.optsClass.join(' ')}>
                            Poetry
                        </div>
                        <div onClick={() => this.clickCategory('Sports')} className={this.optsClass.join(' ')}>
                            Sports
                        </div>
                        <div onClick={() => this.clickCategory('Music')} className={this.optsClass.join(' ')}>
                            Music
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        username: state.auth.username,
        blogCategory: state.auth.blogCategory
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addCategory: (username, clickedElement) => dispatch(actions.addCategoryAction(username, clickedElement))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(blogCategory);