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
  beginDrag(props) {
    return {
      size: props.size
    };
  }
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  };
}
export default DragSource("gobbler", spec, collect)(Gobbler);