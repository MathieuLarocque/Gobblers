import { DragSource } from 'react-dnd';
import { connect } from 'react-redux';
import React from 'react';
import { model } from './model';

class Gobbler extends React.Component {
  constructor(props) {
    super(props);
  }
  render () {
    const { isDragging, connectDragSource } = this.props;
    // console.log(this.props);
    const classesnames = "gobbler " + this.props.size + " " + this.props.color;
    return connectDragSource(
      <div className={ classesnames }></div>
    )
  }
}


const events = {
  beginDrag (props) {
    // console.log(props);
    var { gobblers, coords } = props;
    if (gobblers && gobblers.length > 0 && coords) {
        // model.board.popGobbler(coords);
        Meteor.call('popGobbler', coords, props.board._id, function () {
            // console.log('update finished');
        });
    }
    return {
      size: props.size,
      sizeNum: props.sizeNum,
      color: props.color
    };
  },
  endDrag(props, monitor) {
    console.log(props);
    console.log(monitor);
    var gobblerDropped = monitor.getItem();
    var { model, coords } = props;
    var res = monitor.getDropResult() || {};
    console.log(res);
    if (res.coords) {
      Meteor.call('pushGobbler', res.coords, gobblerDropped, props.board._id, function () {
          // console.log('update finished');
      });
      // model.board.pushGobbler(res.coords, gobblerDropped);
    } else if (coords) {
      Meteor.call('pushGobbler', coords, gobblerDropped, props.board._id, function () {
          // console.log('update finished');
      });
      // model.board.pushGobbler(coords, gobblerDropped);
    }
  },
  canDrag(props, monitor) {
    // console.log(props);
    // console.log(Meteor.userId());
    var { board, color } = props;
    if (board && Meteor.userId() && color) {
      if (board.red === Meteor.userId() && color === 'red') {
        return true;
      } else if (board.green === Meteor.userId() && color === 'green') {
        return true;
      }
    }
  }
};

function mapProps(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  };
}

var dnd = DragSource("gobbler", events, mapProps);

var connectRedux = connect(state => Object.assign({}, {
    board: state.board
}));

export default connectRedux(dnd(Gobbler));