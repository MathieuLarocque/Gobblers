import { DropTarget } from 'react-dnd';
import { connect } from 'react-redux';
import React from 'react';
import Gobbler from './gobbler.c.js';

class Cell extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    var { gobblers, coords } = this.props;
    let lastGobbler = false;
    if (gobblers.length > 0) {
      lastGobbler = gobblers[gobblers.length - 1];
    }
    let lastGobblerComp;
    if (lastGobbler) {
      lastGobblerComp = (<div className="gobblercontainer" >
      <Gobbler color={lastGobbler.color} 
              size={lastGobbler.size} 
              sizeNum={lastGobbler.sizeNum}
              gobblers={gobblers}
              coords={coords}>
      </Gobbler></div> )
    }
    return this.props.connectDropTarget( 
      <div className="cell"  data-cell={ this.props.coords }>
        {lastGobblerComp}
      </div> 
    )
  }
}

const events = {
  drop(props, monitor, component) {
    var gobbler = monitor.getItem();
    var { gobblers, coords } = props;
    return { gobblers, coords };
  },
  canDrop(props, monitor) {
    var gobbler = monitor.getItem();
    var { gobblers } = props;
    if (gobblers.length > 0) {
        var lastGobbler = gobblers[gobblers.length - 1];
        if (lastGobbler && gobbler.sizeNum > lastGobbler.sizeNum) {
            return true;
        }
    } else {
      return true;
    }
    return false;
  }
};

function mapProps(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    isOverCurrent: monitor.isOver({ shallow: true }),
    canDrop: monitor.canDrop(),
    itemType: monitor.getItemType()
  };
}

var dnd = DropTarget("gobbler", events, mapProps);

var connectRedux = connect(state => Object.assign({}, {
    board: state.board
}));


export default connectRedux(dnd(Cell));