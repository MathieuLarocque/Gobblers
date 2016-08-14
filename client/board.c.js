import Board from './board.v.js';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';
import { connectModel } from './reduxModel.js';


export default connectModel(DragDropContext(HTML5Backend)(Board));