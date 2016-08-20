import { Accounts } from 'meteor/accounts-base';
import { browserHistory } from 'react-router';
import { Meteor } from 'meteor/meteor';
import LoginComponent from './login.c.js';

export default {
    me: {},  
    register: function (options) {
        Accounts.createUser(options, err => {
            if (err) {
                console.log("there was an error: " + err.reason);
            } else { 
                browserHistory.push('/');
            };
        });
    },
    getMe() {
        return Meteor.user();
    },
    signout() {
        Meteor.logout(err => {
            if (err) {
                console.log(err);
            } else {
                console.log('Logging out!');
                this.dispatch(null);
            }
        });
    },
    getLoginComponent() {
        return LoginComponent;
    },
    getMyUsername() {
        var me = Meteor.user() || {};
        if (me.profile && me.profile.name) {
            return me.profile.name;
        } else if (me.username) {
            return me.username;
        } else {
            return null;
        }
    },
    goToLogin() {
        browserHistory.push('/login');
    },
    checkIfLoggedIn() {
        var me = this.getMe();
            console.log(me);
        if (!(me && me._id)) {
            browserHistory.push('/login');
        }
    },
    readAndDispatch() {
        var me = this.getMe();
        if (me && me._id) {
            this.dispatch(me);
            if (browserHistory.length) {
                browserHistory.pop();
            }
        } 
    },
    update: function () {},
    remove: function () {}
}