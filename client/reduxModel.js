import { connect } from 'react-redux';
import { createStore } from 'redux';

function createReducer (model) {
    return function (state = {}, action) {
        console.log('inside', action);
        var propNames = Object.keys(model);
        for (var i = 0; i < propNames.length; i++ ) {
            if (action.type === model[propNames[i]]) {
                return Object.assign({}, state, {[name]: action.payload});
            }
        }
        return state;
    }
}

function Reduxify (store, model) {
    var propNames = Object.keys(model);
    propNames.map(name => {
        model[name].dispatch = data => {
            store.dispatch({
                type: name,
                payload: data
            });
        }
    });
}

function modelConnector (model) {
    var store = createStore(createReducer(model)); 
    Reduxify(store, model)
    return connect(state => Object.assign(state, {model}));
}

export default modelConnector;