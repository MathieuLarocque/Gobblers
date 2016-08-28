'use strict';
import { Meteor } from 'meteor/meteor';
import Boards from './Boards.js'
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
              green: c.challenger
          });
        } else if (c.challenger === this.userId) {
          boardId = Boards.insert({
              board: emptyBoard,
              red: c.opponent,
              green: this.userId
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
            red: this.userId
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
        var board = Boards.findOne(id).board;
        board[row][col].push(gobbler);
        console.log(board[row][col]);
        return Boards.update(id, {$set: {board: board}});
    },
    popGobbler: function (coords, id) {
        var [row, col] = coords.split('_');
        var board = Boards.findOne(id).board;
        board[row][col].pop();
        console.log(board[row][col]);
        return Boards.update(id, {$set: {board: board}});
    },
    createBoard: function () {
      return Boards.insert({});
    }
  });
});
