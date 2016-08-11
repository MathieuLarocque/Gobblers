import { browserHistory } from 'react-router';
import store from './store.js';
// var db = new Mongo.Collection("boards");
import db from './db.js';

// var Challenges = new Mongo.Collection("challenges");
// Meteor.subscribe('allBoards');
// Meteor.subscribe('leaderboard');
// Meteor.subscribe('challenges');
var emptyBoard = [[ [], [], [] ], 
                  [ [], [], [] ], 
                  [ [], [], [] ]];
var model = {
    board: {
        Create: function () {
            this.id = db.insert({
                board: emptyBoard, 
                player1: Meteor.userId()
            });
        },
        Read: function () {
            var game = db.findOne(this.id);
            if (game && game.board) {
                this.board = game.board;
                return this.board;
            } else {
                return {};
            }
        },
        Update: function (coords, gobblers) {
            Meteor.call('update', coords, gobblers, this.id, function () {
                console.log('update finished');
            });
        },
        Delete: function () {},
    },
    users: {
        Create: function (options) {
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
        Read: function () {
            Meteor.call('getUsers', function (err, users) {
                store.dispatch({
                    type: 'UPDATE_LEADERBOARD',
                    users: users
                });
            });
        },
        Update: function () {},
        Delete: function () {},
    },
    challenge: {
        Create: function () {
            Meteor.call('createChallenge', user, function (err, boardId) {
                // console.log(boardId);
            });
        },
        Read: function () {},
        Update: function () {},
        Delete: function () {
            Meteor.call('acceptChallenge', id, function (err, boardId) {
                browserHistory.push('/board/' + boardId);
                store.dispatch({
                    type: 'CHALLENGE',
                    challenge: null
                });
            });
        },
    }
};
export default model;