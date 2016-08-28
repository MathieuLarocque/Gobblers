import { browserHistory } from 'react-router';
import { addModel } from './reduxModel.js';
import { Meteor } from 'meteor/meteor';


var db = new Mongo.Collection("boards");
Meteor.subscribe('allBoards');

var emptyBoard = [[ [], [], [] ], 
                  [ [], [], [] ], 
                  [ [], [], [] ]];

export default { 
    id: '',
    create: function () {
        this.id = db.insert({
            board: emptyBoard, 
            player1: Meteor.userId()
        });
        // this.dispatch(emptyBoard);
        return this.id;
    },
    getBoard: function (id) {
        this.id = id || this.id;
        var game = db.findOne(this.id);
        // console.log(game);
        if (game && game.board) {
            return game;
        } else {
            return [];
        }
    },
    createAutorun: function (id) {
        return Tracker.autorun(runner => {
            var board = this.getBoard(id);
                // console.log(board);
            if (board && board._id) {
                this.dispatch(board);
            } 
        });
    },
    readAndDispatch: function () {
        var board = this.getBoard();
        if (board && board._id) {
            this.dispatch(board);
        } 
    },
    update: function (coords, gobblers) {
        console.log(coords, gobblers);
        Meteor.call('update', coords, gobblers, this.id, function () {
            // console.log('update finished');
        });
    },
    pushGobbler: function (coords, gobbler) {
        console.log(coords, gobbler);
        Meteor.call('pushGobbler', coords, gobbler, this.id, function () {
            // console.log('update finished');
        });
    },
    popGobbler: function (coords) {
        console.log(coords);
        Meteor.call('popGobbler', coords, this.id, function () {
            // console.log('update finished');
        });
    },
    remove: function () {}
};