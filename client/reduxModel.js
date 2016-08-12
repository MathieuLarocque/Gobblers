import { connect } from 'react-redux';
import { createStore } from 'redux';

function createReducer (model) {
    return function (state = {}, action) {
        console.log('inside', action);
        var propNames = Object.keys(model);
        for (var i = 0; i < propNames.length; i++ ) {
            console.log(propNames, action.type);
            if (action.type === propNames[i]) {
                var newState = Object.assign({}, state, {[propNames[i]]: action.payload});
                console.log('state', newState);
                return newState;
            }
        }
        return state;
    }
}

function Reduxify (store, model) {
    var propNames = Object.keys(model);
    propNames.map(name => {
        model[name].dispatch = data => {
            console.log(name, data);
            store.dispatch({
                type: name,
                payload: data
            });
        }
    });
    return model
}

function modelConnector (model) {
    var store = createStore(createReducer(model)); 
    Reduxify(store, model)
    return store;
    // return connect(state => Object.assign({}, state, {model}));
}

export default modelConnector;