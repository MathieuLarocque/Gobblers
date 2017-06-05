import { DropTarget } from 'react-dnd';
import React from 'react';
import Gobbler from './gobbler.c.js';

class Cell extends React.Component {
  render() {
    var { gobblers, coords, playerColor } = this.props;
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
              canTake={playerColor === lastGobbler.color}
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
    // var gobbler = monitor.getItem();
    var { gobblers, coords } = props;
    // console.log('drop', props, monitor, component);
    return { gobblers, coords };
  },
  canDrop(props, monitor) {
    var gobbler = monitor.getItem();
    var { gobblers } = props;
    if (gobblers && gobblers.length < 3) {
        if (gobblers.length) {
          var lastGobbler = gobblers[gobblers.length - 1];
          if (lastGobbler && gobbler.sizeNum > lastGobbler.sizeNum) {
              // console.log('candrop', props);
              return true;
          }
        } else {
          // console.log('candrop', props);
          return true;
        }
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


export default dnd(Cell);