import { DragSource } from 'react-dnd';
import React from 'react';
import socket from './socket.js';

class Gobbler extends React.Component {
  render () {
    // const { isDragging, connectDragSource } = this.props;
    const { connectDragSource } = this.props;
    // console.log(this.props);
    const classesnames = "gobbler " + this.props.size + " " + this.props.color;
    return connectDragSource(
      <div className={ classesnames }></div>
    )
  }
}


const events = {
  beginDrag (props) {
    // console.log('begin', props);
    var { gobblers, coords } = props;
    if (gobblers && gobblers.length > 0 && coords) {
        socket.emit('popGobbler', coords)
    }
    return {
      size: props.size,
      sizeNum: props.sizeNum,
      color: props.color
    };
  },
  endDrag(props, monitor) {
    // console.log(monitor);
    var gobblerDropped = monitor.getItem();
    // console.log('end', props, gobblerDropped);
    var { coords } = props;
    var res = monitor.getDropResult() || {};
    // console.log(res);
    if (res.coords) {
      socket.emit('pushGobbler', res.coords, gobblerDropped);
    } else if (coords) {
      socket.emit('pushGobbler', coords, gobblerDropped);
    }
  },
  canDrag(props, monitor) {
    // console.log(props.canTake);
    return props.canTake;
  }
};

function mapProps(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  };
}

var dnd = DragSource("gobbler", events, mapProps);


export default dnd(Gobbler);