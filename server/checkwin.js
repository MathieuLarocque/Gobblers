function allEqual(arr) {
    function lastGob (gobs) {
        if (gobs.length) {
            return gobs[gobs.length - 1];
        } else {
            return {};
        }
    }
    var allRed = arr.every(gobs => lastGob(gobs).color === 'red');
    var allGreen = arr.every(gobs => lastGob(gobs).color === 'green');
    // console.log(allRed, allGreen);
    if (allRed) {
        return 'red';
    } else if (allGreen) {
        return 'green';
    } else {
        return null;
    }
  }

exports.checkwin = function checkwin (board = []) {
    // Check rows.
    for (let rowI in board) {
        let row = board[rowI];
        var res = allEqual(row);
        if (res) {
            return res
        }
    }

    // Check columns.
    let firstRow = board[0];
    for (let colI in firstRow) {
        var col = [];
        for (let rowI in board) {
            col.push(board[rowI][colI]);
        }
        var res = allEqual(col);
        if (res) {
            return res
        }
    }

    // Check diagonals.
    var left = [];
    var right = [];
    var width = board.length;
    for (let i in board) {
      left.push(board[i][i]);
      right.push(board[width - i - 1][i]);
    }
    var res = allEqual(left);
    if (res) {
        return res
    }
    var res = allEqual(right);
    if (res) {
        return res
    }
  }