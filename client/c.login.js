'use strict';
import React from 'react';
import connectRedux from './connect.redux.js';
import { Meteor } from 'meteor/meteor';
import { browserHistory } from 'react-router';
import modelConnect from './connect.model.js';

class Login extends React.Component {

    constructor(props) {
        super(props);
    }
    submitUser(event) {
        event.preventDefault();
        var options = {
            username: this.refs.email.value, 
            email: this.refs.email.value, 
            password: this.refs.password.value, 
            profile: {
                name: this.refs.name.value
            }
        };
        this.props.model.users.Create(options)
    }
    render() {
        return (
    <form onSubmit={this.submitUser.bind(this)}>
        <div className="form-group">
            <label htmlFor="name">Full name:</label>
            <input placeholder="Name" type="text" id="name" ref="name" className="form-control"/>
        </div>
        <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input placeholder="Email" type="email" id="email" ref="email" className="form-control"/>
        </div>
        <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input placeholder="Password" type="password" id="password" ref="password" className="form-control"/>
        </div>
        <div className="form-group">
            <button type="submit" className="btn btn-primary">Submit</button>
        </div>
    </form>
        );
    }
}
Login.propTypes = { 
    users: React.PropTypes.array
};
Login.defaultProps = { users: [] };
export default modelConnect(Login);