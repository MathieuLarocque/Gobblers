'use strict';
import { Meteor } from 'meteor/meteor';
import Boards from './Boards.js';
import checkwin from './checkwin.js';
var Challenges = new Mongo.Collection("challenges");
Meteor.publish('challenges', function () {
  if (this.userId){
    return Challenges.find({$or: [ 
      {challenger: this.userId}, 
      {opponent: this.userId} 
    ]});
  }
});
var quickPlayWaitingList = [];
var quickPlayWaitingPlayer = null;
var quickPlayWaitingBoard = null;
var emptyBoard = [[ [], [], [] ], 
                  [ [], [], [] ], 
                  [ [], [], [] ]];
var emptyCube = [[ [], [], [] ], 
[ [], [], [] ], 
[ [], [], [] ]];
Meteor.startup(() => {
  
  Meteor.methods({
    getUsers: function () {
      var users = Meteor.users;
      var usersList = users.find().fetch();
      return usersList;
    },
    createChallenge: function (userId) {
      // var user = Meteor.users.findOne(userId);
      var challengeId = Challenges.insert({
        challenger: this.userId,
        opponent: userId,
        accepted: false
      });
      console.log(challengeId);
      return challengeId;
    },
    acceptChallenge: function (id) {
        var c = Challenges.findOne(id);
        if (!c) {
          return null;
        }
        var boardId = null;
        if (c.opponent === this.userId) {
          boardId = Boards.insert({
              board: emptyBoard, 
              red: this.userId,
              green: c.challenger,
              poped: null,
              turn: 'green'
          });
        } else if (c.challenger === this.userId) {
          boardId = Boards.insert({
              board: emptyBoard,
              red: c.opponent,
              green: this.userId,
              poped: null,
              turn: 'green'
          });
        }
        if (!boardId) {
          return null;
        }
        Challenges.update(id, {$set: {boardId}});
       return boardId;
    },
    refuseChallenge: function (id) {
      console.log(id);
      console.log(Challenges.findOne(id));
      var n = Challenges.remove(id);
      console.log(n);
      return n;
    },
    quickPlay(userId) {
      if (quickPlayWaitingBoard) {
        Boards.update(quickPlayWaitingBoard, {$set: {green: this.userId}});
        var tempoBoardId = quickPlayWaitingBoard;
        quickPlayWaitingBoard = null;
        return tempoBoardId;
      } else {
         quickPlayWaitingBoard = Boards.insert({
            board: emptyBoard, 
            red: this.userId,
            poped: null,
            turn: this.userId,
            winner: null
         });
         return quickPlayWaitingBoard;
      }
    },
    update: function (coords, gobblers, id) {
        var [row, col] = coords.split('_');
        var board = Boards.findOne(id).board;
        console.log(board[row][col]);
        board[row][col] = gobblers;
        return Boards.update(id, {$set: {board: board}});
    },
    newBoard: function (newBoard) {
      var id = Boards.insert({board: newBoard});
      return id;
    },
    pushGobbler: function (coords, gobbler, id) {
        var [row, col] = coords.split('_');
        var game = Boards.findOne(id);
        if (game && this.userId && !game.winner && game.turn === this.userId) {
          var board = game.board;
          board[row][col].push(gobbler);
          var winningColor = checkwin(board);
          console.log('winner :', winningColor);
          if (winningColor === 'red') {
            var winner = game.red;
            console.log('winner id : ', winner);
            return Boards.update(id, {$set: {board: board, poped: null, winner}});
          } else if (winningColor === 'green') {
            var winner = game.green;
            return Boards.update(id, {$set: {board: board, poped: null, winner}});
          } else if (game.poped && game.poped === coords) {
            return Boards.update(id, {$set: {board: board, poped: null}});
          } else {
            if (game.red === this.userId) {
              return Boards.update(id, {$set: {board: board, poped: null, turn: game.green}});
            } else if (game.green === this.userId) {
              return Boards.update(id, {$set: {board: board, poped: null, turn: game.red}});
            }
          }
        }
    },
    popGobbler: function (coords, id) {
        var [row, col] = coords.split('_');
        var game = Boards.findOne(id);
        if (game && this.userId && !game.winner && game.turn === this.userId) {
          var board = game.board;
          board[row][col].pop();
          var winningColor = checkwin(board);
          if (winningColor === 'red') {
            var winner = game.red;
            return Boards.update(id, {$set: {board: board, poped: null, winner}});
          } else if (winningColor === 'green') {
            var winner = game.green;
            return Boards.update(id, {$set: {board: board, poped: null, winner}});
          } else {
            return Boards.update(id, {$set: {board: board, poped: coords}});
          }
        }
    },
    createBoard: function () {
      return Boards.insert({});
    }
  });
});
