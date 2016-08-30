import { browserHistory } from 'react-router';
import { Meteor } from 'meteor/meteor';

var Challenges = new Mongo.Collection("challenges");

Meteor.subscribe('leaderboard');
Meteor.subscribe('challenges');

export default {    
    id: '',
    getChallenge() {
        // var userId = Meteor.userId();
        var c = Challenges.findOne();
        return c;
    },
    create(opponent) {
        Meteor.call('createChallenge',  opponent, (err, id) => {
            console.log(id, err);
            this.id = id;
        });
    },
    readAndDispatch() {
        var newChallenge = this.getChallenge();
        if (newChallenge && newChallenge._id) {
            this.id = newChallenge._id;
            this.dispatch(Object.assign(newChallenge, { pending: true }));
        } 
    },
    accept(id) {
        return function () {
            Meteor.call('acceptChallenge', id, function (err, boardId) {
                // browserHistory.push('/board/' + boardId);
            });
        }
    },
    refuse(id) {
        return () => {
            Meteor.call('refuseChallenge', id, (err, n) => {
                console.log(n);
                if (n === 1) {
                    this.dispatch(null);
                }
            });
        }
    },
    update: function () {},
    remove: function () {
    }
};