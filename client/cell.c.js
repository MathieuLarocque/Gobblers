import { DropTarget } from 'react-dnd';
import Cell from './cell.v.js';
import { connectModel } from './reduxModel.js';

const events = {
  drop(props, monitor, component) {
    var gobbler = monitor.getItem();
    var { gobblers, coords, model } = props;
    if (gobblers.length > 0) {
        var lastGobbler = gobblers[gobblers.length - 1];
        if (lastGobbler && gobbler.sizeNum > lastGobbler.sizeNum) {
            model.board.update(coords, gobblers.concat(gobbler));
            return {moved: true};
        }
    } else {
      model.board.update(coords, gobblers.concat(gobbler));
      return {moved: true};
    }
    return {moved: false};
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

export default connectModel(dnd(Cell));