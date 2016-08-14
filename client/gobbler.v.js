'use strict';
import React from 'react';
import connectDnd from './gobbler.c.js';

export default class Gobbler extends React.Component {
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
