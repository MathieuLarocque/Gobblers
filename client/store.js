import { createStore, applyMiddleware } from 'redux';

function reducer (state = {}, action) {
  switch (action.type) {
    case 'UPDATE_BOARD':
      return {
        data: action.data,
        board: action.data.board
      };
    default:
      return state
  }
}

export default createStore(reducer);