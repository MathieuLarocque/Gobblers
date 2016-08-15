import { browserHistory } from 'react-router';
import { Meteor } from 'meteor/meteor';

var Challenges = new Mongo.Collection("challenges");

Meteor.subscribe('leaderboard');
Meteor.subscribe('challenges');

export default {    
    create: function () {
        Meteor.call('createChallenge', user, function (err, boardId) {
            // console.log(boardId);
        });
    },
    read: function () {
        Meteor.call('getUsers', function (err, users) {
            if (err) {
                console.log("there was an error: " + err.reason);
            } else { 
                this.dispatch(users);
            }
        });
    },
    update: function () {},
    remove: function () {
        Meteor.call('acceptChallenge', id, function (err, boardId) {
            browserHistory.push('/board/' + boardId);
        });
    }
};