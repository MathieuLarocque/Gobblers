import { browserHistory } from 'react-router';
var Challenges = new Mongo.Collection("challenges");

export default {    
    create: function (options) {
        Accounts.createUser(options, err => {
            if (err) {
                console.log("there was an error: " + err.reason);
            } else { 
                browserHistory.push('/leaderboard')
                Meteor.call('getUsers', function (err, users) {
                        if (err) {
                            console.log("there was an error: " + err.reason);
                        } else { 
                            this.dispatch(users);
                        }
                });
            };
        });
    },
    read: function () {
        Meteor.call('getUsers', function (err, users) {
        });
    },
    update: function () {},
    remove: function () {}
}