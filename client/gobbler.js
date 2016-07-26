import React from 'react';
import Board from './board.js';
import {DragSource} from 'react-dnd';

'use strict';

class Gobbler extends React.Component {
  constructor(props) {
    super(props);
  }
  render () {
    const { isDragging, connectDragSource } = this.props;
    const classesnames = "gobbler " + this.props.size + " " + this.props.color;
    return connectDragSource(
      <div className={ classesnames }></div>
    )
  }
}

const spec = {
  beginDrag(props, monitor, component) {
    if (props.remove) {
      props.remove();
    }
    return {
      size: props.size,
      sizeNum: props.sizeNum,
      color: props.color
    };
  },
  endDrag(props, monitor, component) {
    var res = monitor.getDropResult();
    var gobbler = monitor.getItem();
    if (res && res.moved) {
      if (props.remove) {
        props.remove(true);
      }
      // if (gobbler == )
    } else if (props.add) {
      console.log("yo");
      props.add(gobbler);
    }
  }
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  };
}
export default DragSource("gobbler", spec, collect)(Gobbler);