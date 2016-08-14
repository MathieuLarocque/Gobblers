// import { browserHistory } from 'react-router';
// import store from './store.js';
// import db from './db.js';
// var Challenges = new Mongo.Collection("challenges");
// Meteor.subscribe('allBoards');
// Meteor.subscribe('leaderboard');
// Meteor.subscribe('challenges');

// var emptyBoard = [[ [], [], [] ], 
//                   [ [], [], [] ], 
//                   [ [], [], [] ]];
// var id;
// var data = {
//     board: emptyBoard,
//     id: '',
//     fetchUsers: function () {
//         var users = Meteor.users.find();
//         return users;
//     },
//     createChallenge: function (user) {
//         Meteor.call('createChallenge', user, function (err, boardId) {
//             // console.log(boardId);
//         });
//     },
//     acceptChallenge: function (id) {
//         Meteor.call('acceptChallenge', id, function (err, boardId) {
//             browserHistory.push('/board/' + boardId);
//             store.dispatch({
//                 type: 'CHALLENGE',
//                 challenge: null
//             });
//         });
//     },
//     rejectChallenge: function (id) {
//         Meteor.call('rejectChallenge', id, function (err, nextChallenge) {
//             store.dispatch({
//                 type: 'CHALLENGE',
//                 challenge: nextChallenge
//             });
//         });
//     },
//     fetchChallenges: function () {
//         var userId = Meteor.userId();
//         console.log(userId);
//         return Challenges.findOne({opponent: userId, active: true});
//     },
//     getUsers: function (callback) {
//         Meteor.call('getUsers', function (err, users) {
//             store.dispatch({
//                 type: 'UPDATE_LEADERBOARD',
//                 users: users
//             });
//         });
//     },
//     createUser: function (options) {
//         Accounts.createUser(options, err => {
//             if (err) {
//                console.log("there was an error: " + err.reason);
//             } else { 
//                browserHistory.push('/leaderboard')
//                Meteor.call('getUsers', function (err, users) {
//                     if (err) {
//                         console.log("there was an error: " + err.reason);
//                     } else { 
//                         console.log(users);
//                         store.dispatch({
//                             type: 'UPDATE_LEADERBOARD',
//                             users: users
//                         });
//                     }
//                });
//             };
//         });
//     },
//     create: function () {
//         this.id = db.insert({
//             board: emptyBoard, 
//             player1: Meteor.userId()
//         });
//         // Meteor.call('newBoard', emptyBoard, function (newId) {
//         //     id = newid;
//         //     console.log(newId);
//         // });
//     },
//     fetchBoard: function () {
//         var game = db.findOne(this.id);
//         if (game && game.board) {
//             this.board = game.board;
//             return this.board;
//         } else {
//             return {};
//         }
//     },
//     update: function (coords, gobblers) {
//         Meteor.call('update', coords, gobblers, this.id, function () {
//             console.log('update finished');
//         });
//         // var [row, col] = coords.split('_');
//         // this.board[row][col] = gobblers;
//         // db.update(this.id, {$set: {board: this.board}});
//     }
// }

// export default data;