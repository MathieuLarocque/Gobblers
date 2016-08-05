'use strict';
var Boards = new Mongo.Collection("boards");

Meteor.publish('allBoards', function () {
    return Boards.find();
})

Boards.allow({
  insert: function (userId, doc) {
    var b = doc.board;
    var allow = true;
    if (b.length === 3) {
       b.map(r => {
         if (r.length === 3) {
           r.map(c => {
             if (c.length) {
               return false;
             }
           })
         } else {
           return false;
         }
       })
    } else {
      return false;
    }
    return allow;
    // the user must be logged in, and the document must be owned by the user
    // return true;
  }
});

export default Boards;