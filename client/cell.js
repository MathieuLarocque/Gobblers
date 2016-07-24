import React from 'react';
import { Meteor } from 'meteor/meteor';
import Board from './board.js';
import HTML5Backend from 'react-dnd-html5-backend';
import Gobbler from './gobbler.js';
import { DragDropContext } from 'react-dnd';
import { DropTarget } from 'react-dnd';

'use strict';

class Cell extends React.Component {

  constructor(props) {
    super(props);
    this.board = this.props.board;
    this.state = {gobblers: []};
  }

  componentDidMount() {
  
  }

  addGobbler(gobbler) {
    let gobblers = this.state.gobblers;
    if (gobblers.length > 0) {
      var lastGobbler = gobblers[gobblers.length - 1];
      if (lastGobbler && gobbler.sizeNum > lastGobbler.sizeNum) {
        gobblers.push(gobbler);
        this.setState({gobblers});
        return {moved: true};
      }
    } else {
      gobblers.push(gobbler);
      this.setState({gobblers});
      return {moved: true};
    }
  }

  removeGobbler(end) {
    let gobblers = this.state.gobblers;
    if (gobblers.length > 1) {
      gobblers.pop();
      this.setState({gobblers});
    } else if (end) {
      gobblers = [];
      this.setState({gobblers});
      // gobblers[0].isHidden = true;
      // this.setState(gobblers);
    }
  }

  render() {
    // const cell = this.props.cell;
    const [ size, player ] = this.props.cell.split("_");
    let gobblers = this.state.gobblers;
    let lastGobbler = gobblers[gobblers.length - 1];
    let lastGobblerComp;
    let ifHidden = '';
    if (lastGobbler && lastGobbler.isHidden) {
      ifHidden = 'hidden';
    } else {
      ifHidden = 'gobblercontainer';      
    }
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
    board: React.PropTypes.object,
    freezeBoard: React.PropTypes.bool
};
Cell.defaultProps = { freezeBoard: false };

// export default TicTacToe;
const spec = {
  drop(props, monitor, component) {
    var gobbler = monitor.getItem();
    props.dropFunc(props.coords, gobbler.size);
    var gobblers = component.state.gobblers;
    if (gobblers.length > 0) {
      var lastGobbler = gobblers[gobblers.length - 1];
      if (lastGobbler && gobbler.sizeNum > lastGobbler.sizeNum) {
        gobblers.push(gobbler);
        component.setState({gobblers});
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