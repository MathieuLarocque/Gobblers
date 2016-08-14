import { browserHistory } from 'react-router';

Meteor.subscribe('leaderboard');
Meteor.subscribe('challenges');

export default {    
    create: function () {
        Meteor.call('createChallenge', user, function (err, boardId) {
            // console.log(boardId);
        });
    },
    read: function () {},
    update: function () {},
    remove: function () {
        Meteor.call('acceptChallenge', id, function (err, boardId) {
            browserHistory.push('/board/' + boardId);
        });
    }
};