'use strict';
import React from 'react';
import { Meteor } from 'meteor/meteor';
import Board from './board.js';
import HTML5Backend from 'react-dnd-html5-backend';
import Gobbler from './gobbler.js';
import { DragDropContext } from 'react-dnd';
import { DropTarget } from 'react-dnd';
import Boards from '../common.js';

class Cell extends React.Component {

  constructor(props) {
    super(props);
    this.state = {gobblers: []};
  }

  componentDidMount() {
  
  }

  addGobbler(gobbler) {
    let board = this.props.board;
    let [row, col] = this.props.coords.split('_');
    let gobblers = board[row][col];
    if (gobblers.length > 0) {
      var lastGobbler = gobblers[gobblers.length - 1];
      if (lastGobbler && gobbler.sizeNum > lastGobbler.sizeNum) {
        gobblers.push(gobbler);
        board[row][col] = gobblers;
        Boards.update(this.props.boardId, {$set: {board: board}});
        // this.setState({gobblers});
        return {moved: true};
      }
    } else {
      gobblers.push(gobbler);
      board[row][col] = gobblers;
      Boards.update(this.props.boardId, {$set: {board: board}});
      // this.setState({gobblers});
      return {moved: true};
    }
  }

  removeGobbler(end) {
    let {board} = Boards.findOne(this.props.boardId);
    let [row, col] = this.props.coords.split('_');
    let gobblers = board[row][col];
    // let gobblers = this.state.gobblers;
    if (gobblers.length > 1) {
      gobblers.pop();
      board[row][col] = gobblers;
      Boards.update(this.props.boardId, {$set: {board: board}});      
      // this.setState({gobblers});
    } else if (end) {
      gobblers = [];
      board[row][col] = gobblers;
      Boards.update(this.props.boardId, {$set: {board: board}});      
      // this.setState({gobblers});
      // gobblers[0].isHidden = true;
      // this.setState(gobblers);
    }
  }

  render() {
    
    // let gobblers = this.state.gobblers;
    let lastGobbler;
    let gobblers = this.props.gobblers;
    if (gobblers.length > 0) {
      lastGobbler = gobblers[gobblers.length - 1];
    } 
    console.log(gobblers);
    // let lastGobbler = gobblers[gobblers.length - 1];
    let lastGobblerComp;
    if (lastGobbler) {
      lastGobblerComp = (<div className="gobblercontainer" ><Gobbler color={lastGobbler.color} size={lastGobbler.size} sizeNum={lastGobbler.sizeNum} remove={this.removeGobbler.bind(this)} add={this.addGobbler.bind(this)}>
                            </Gobbler></div> )
    }
    return this.props.connectDropTarget( <div className="cell"  data-cell={ this.props.coords }>
        {lastGobblerComp}
      </div> 
    )
  }
}

Cell.propTypes = { 
    coords: React.PropTypes.string,
    cell: React.PropTypes.string,
    boardId: React.PropTypes.string,
    freezeBoard: React.PropTypes.bool
};
Cell.defaultProps = { freezeBoard: false };

// export default TicTacToe;
const spec = {
  drop(props, monitor, component) {
    let board = Boards.findOne(props.boardId);
    let [row, col] = props.coords.split('_');
    if (board) {
      let gobblers2 = board.board[row][col];
      console.log(gobblers2);
    }
    // let gobblers2 = board[row][col];
    console.log(props.boardId, board, row, col);
    var gobbler = monitor.getItem();
    props.dropFunc(props.coords, gobbler.size);
    var gobblers = component.state.gobblers;
    if (gobblers.length > 0) {
      var lastGobbler = gobblers[gobblers.length - 1];
      if (lastGobbler && gobbler.sizeNum > lastGobbler.sizeNum) {
        gobblers.push(gobbler);
        board.board[row][col] = gobblers;
        console.log(Boards.update(props.boardId, {$set: {board: board.board}}));
        // component.setState({gobblers});
        return {moved: true};
      }
    } else {
      gobblers.push(gobbler);
      component.setState({gobblers});
      return {moved: true};
    }
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