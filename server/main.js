'use strict';
import { Meteor } from 'meteor/meteor';
import Boards from '../common.js'

Meteor.startup(() => {
  
  Meteor.methods({
    makeMove: function (boardId, newBoard) {
      return Boards.update(boardId, {$set: {board: newBoard}});
    },
    newBoard: function (newBoard) {
      return Boards.insert({board: newBoard});
    },
    createBoard: function () {
      return Boards.insert({});
    }
  });
});
