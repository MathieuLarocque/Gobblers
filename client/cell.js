import React from 'react';
import Board from './board.js';
import ai from './ai.js';
import HTML5Backend from 'react-dnd-html5-backend';
import Gobbler from './gobbler.js'
import { DragDropContext } from 'react-dnd';
import { DropTarget } from 'react-dnd';

'use strict';

class Cell extends React.Component {

  constructor(props) {
    super(props);
    this.board = this.props.board;
    this.state = {player: 1, freezeBoard: false, winner: false};
  }

  nextPlayer() {
    return this.state.player === 1 ? 2 : 1;
  }

  // Place a move on the board and check for a winner.
  move(x, y, player, callback) {
    this.board.move(x, y, player);
    const winner = this.board.checkWin();

    if (winner) {
      this.setState({winner, freezeBoard: true});
    } else {
      callback();
    }
  }

  // Handle a player's move, and switch to the next player.
  playerMove(event) {
    const [ x, y ] = event.target.dataset.cell.split('_');
    const cellEmpty = this.board.getCell(x, y) === 0;

    if (cellEmpty) {
      this.move(x, y, this.state.player, () => {
        if (this.props.singlePlayer) {
          this.setState({player: this.nextPlayer(), freezeBoard: true}, this.aiMove);
        } else {
          this.setState({player: this.nextPlayer()});
        }
      });
    }
  }

  // Make an AI move, with a small delay for a more natural response time.
  aiMove() {
    const [ x, y ] = ai.move(this.board, this.state.player);

    setTimeout(() => {
      this.move(x, y, this.state.player, () => {
        this.setState({player: this.nextPlayer(), freezeBoard: false});
      });
    }, 200);
  }

  // Determine which player will be the AI in single player mode,
  // and make the first move if appropriate.
  aiInit() {
    if (this.props.singlePlayer) {
      const aiPlayer = Math.floor(Math.random() * 2) + 1;
      if (aiPlayer === 1) {
        this.aiMove();
      }
    }
  }

  reset() {
    this.board = new Board(this.props.width);
    this.setState({player: 1, freezeBoard: false, winner: false});
    this.aiInit();
  }

  componentDidMount() {
    this.aiInit();
  }

  render() {
    // const cell = this.props.cell;
    console.log(this.props.cell);
    const [ size, player ] = this.props.cell.split("_");
    const classString = player > 0 ? player === 1 ? 'cell-p1' : 'cell-p2' : 'cell';
    
    return this.props.connectDropTarget( <div className={ classString }  data-cell={ this.props.coords }></div> )
  }
}

Cell.propTypes = { 
    coords: React.PropTypes.string,
    cell: React.PropTypes.string,
    board: React.PropTypes.object,
    freezeBoard: React.PropTypes.bool
};
Cell.defaultProps = { freezeBoard: false };

// export default TicTacToe;
const spec = {
  drop(props, monitor, component) {
    props.dropFunc(props.coords, monitor.getItem().size);
    return {
      color: "blue"
    };
  }
};
function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    isOverCurrent: monitor.isOver({ shallow: true }),
    canDrop: monitor.canDrop(),
    itemType: monitor.getItemType()
  };
}
export default DropTarget("gobbler", spec, collect)(Cell);