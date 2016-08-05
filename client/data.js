var db = new Mongo.Collection("boards");
Meteor.subscribe('allBoards');
var emptyBoard = [[ [], [], [] ], 
                  [ [], [], [] ], 
                  [ [], [], [] ]];
var id;
var data = {
    board: emptyBoard,
    id: '',
    create: function () {
        this.id = db.insert({board: emptyBoard});
        // Meteor.call('newBoard', emptyBoard, function (newId) {
        //     id = newid;
        //     console.log(newId);
        // });
    },
    fetchBoard: function () {
        this.board = db.findOne(this.id).board;
        return this.board;
    },
    update: function (coords, gobblers) {
        Meteor.call('update', coords, gobblers, this.id, function () {
            console.log('update finished');
        });
        // var [row, col] = coords.split('_');
        // this.board[row][col] = gobblers;
        // db.update(this.id, {$set: {board: this.board}});
    }
}

export default data;