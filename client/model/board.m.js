import { browserHistory } from 'react-router';
import { Meteor } from 'meteor/meteor';

var db = new Mongo.Collection("boards");
Meteor.subscribe('allBoards');

var emptyBoard = [[ [], [], [] ], 
                  [ [], [], [] ], 
                  [ [], [], [] ]];

export default { 
    create: function () {
        return db.insert({
            board: emptyBoard, 
            player1: Meteor.userId()
        });
        // this.setState(emptyBoard);
    },
    getBoard: function (id) {
        var game = db.findOne(id);
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
                this.setState(board);
            } 
        });
    },
    readAndDispatch: function () {
        var board = this.getBoard();
        if (board && board._id) {
            this.setState(board);
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