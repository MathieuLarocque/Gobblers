'use strict';
import React from 'react';
import { browserHistory } from 'react-router';

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.submitUser = this.submitUser.bind(this);
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
        this.props.model.login.register(options)
    }
    render() {
        return (
    <form onSubmit={this.submitUser}>
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
