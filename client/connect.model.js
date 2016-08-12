import modelConnect from './reduxModel.js';
import model from './model.js';
import { connect } from 'react-redux';
console.log(model);
var store = modelConnect(model);
console.log('old',model);
console.log(store);
export default connect(state => Object.assign({}, state, {model}));