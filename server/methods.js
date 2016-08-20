'use strict';
import { Meteor } from 'meteor/meteor';
import Boards from './Boards.js'
var Challenges = new Mongo.Collection("challenges");
Meteor.publish('challenges', function () {
  if (this.userId){
    return Challenges.find();
  }
});
Meteor.startup(() => {
  
  Meteor.methods({
    getUsers: function () {
      var users = Meteor.users;
      var usersList = users.find().fetch();
      return usersList;
    },
    createChallenge: function (userId) {
      var user = Meteor.users.findOne(userId);
      var challengeId = Challenges.insert({
        challenger: this.userId,
        opponent: userId,
        active: true
      });
      console.log(challengeId);
      return challengeId;
    },
    acceptChallenge: function (id) {
       Challenges.remove(id)
    },
    rejectChallenge: function (id) {
       Challenges.remove(id)      
    },
    update: function (coords, gobblers, id) {
        var [row, col] = coords.split('_');
        var board = Boards.findOne(id).board;
        board[row][col] = gobblers;
        return Boards.update(id, {$set: {board: board}});
    },
    newBoard: function (newBoard) {
      var id = Boards.insert({board: newBoard});
      return id;
    },
    createBoard: function () {
      return Boards.insert({});
    }
  });
});
