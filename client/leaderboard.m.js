import { browserHistory } from 'react-router';
import { Meteor } from 'meteor/meteor';

Meteor.subscribe('leaderboard');

export default {    
    challengeSomebody: function (id) {
        Meteor.call('createChallenge', id, function (err, boardId) {
            // console.log(boardId);
        });
    },
    quickPlay(userId) {
        Meteor.call('quickPlay', userId, function (err, boardId) {
            browserHistory.push('/board/' + boardId);
        });
    },
    getUsers() {
        return Meteor.users.find();
    },
    readAndDispatch() {
        var leaderboard = this.getUsers().fetch();
        // browserHistory.push('/login');
        if (leaderboard.length) {
            this.dispatch(leaderboard);
        }
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