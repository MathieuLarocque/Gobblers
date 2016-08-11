'use strict';
import React from 'react';
import connectRedux from './connect.redux.js';
import connectDnd from './connect.dnd.gobbler.js';
import modelConnect from './connect.model.js';

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

export default modelConnect(connectDnd(Gobbler));