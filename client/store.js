import { createStore, applyMiddleware } from 'redux';

function reducer (state = {}, action) {
  console.log(action);
  switch (action.type) {
    case 'INSERT_DATA':
      return { ...state, data: action.data };
    case 'UPDATE_BOARD':
      return { ...state, board: action.board };
    case 'UPDATE_LEADERBOARD':
      return { ...state, users: action.users };
    case 'CHALLENGE':
      return { ...state, challenge: action.challenge };
    case 'UPDATE_ME':
      return { ...state, me: action.me };
    default:
      return state
  }
}

export default createStore(reducer);