import { browserHistory } from 'react-router';
import { Meteor } from 'meteor/meteor';

var Challenges = new Mongo.Collection("challenges");

Meteor.subscribe('leaderboard');
Meteor.subscribe('challenges');

export default {    
    id: '',
    getChallenge() {
        var userId = Meteor.userId();
        return Challenges.findOne({opponent: userId});
    },
    readAndDispatch() {
        var newChallenge = this.getChallenge();
        if (newChallenge && newChallenge.opponent) {
            this.id = newChallenge._id;
            this.dispatch(Object.assign(newChallenge, { pending: true }));
        } 
    },
    accept() {
        Meteor.call('acceptChallenge', this.id, function (err, boardId) {
            browserHistory.push('/board/' + boardId);
        });
    },
    refuse() {},
    update: function () {},
    remove: function () {
    }
};