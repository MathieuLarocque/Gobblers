import { Accounts } from 'meteor/accounts-base';
import { browserHistory } from 'react-router';
import { Meteor } from 'meteor/meteor';

export default {
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
                this.setState(null);
            }
        });
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
        var me = Meteor.user();
        console.log(me);
        if (me && me._id) {
            this.setState(me);
        } 
    },
    update: function () {},
    remove: function () {}
}