import { Accounts } from 'meteor/accounts-base';
import { browserHistory } from 'react-router';
import { Meteor } from 'meteor/meteor';

export default {    
    register: function (options) {
        Accounts.createUser(options, err => {
            if (err) {
                console.log("there was an error: " + err.reason);
            } else { 
                browserHistory.push('/leaderboard');
            };
        });
    },
    getMe() {
        return Meteor.user();
    },
    read: function () {
        Meteor.call('getUsers', function (err, users) {
        });
    },
    update: function () {},
    remove: function () {}
}