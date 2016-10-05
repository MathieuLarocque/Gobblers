import board from './board.m.js';
import login from './login.m.js';
import leaderboard from './leaderboard.m.js';
import challenge from './challenge.m.js';
import { reduxify } from '../reduxModel.js';

var { model, store } = reduxify({ board, login, leaderboard, challenge });
export { model, store };