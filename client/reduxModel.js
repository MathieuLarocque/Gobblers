import { connect } from 'react-redux';
import { createStore as createReduxStore, combineReducers, applyMiddleware } from 'redux'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'

var store = {};
var connectedComponents = [];
var model = {};

function createReducer (model) {
    return function (state = {}, action) {
        var propNames = Object.keys(model);
        for (var i = 0; i < propNames.length; i++ ) {
            if (action.type === propNames[i]) {
                var newState = Object.assign({}, state, {[propNames[i]]: action.payload});
                return newState;
            }
        }
        return state;
    }
}

export function Reduxify (store, model) {
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
    return model;
}

export function getModel () {
    console.log(model);
    return model;
}

export function addModel (prop) {
    console.log(model);
    return Object.assign(model, prop);
}

export function createStore (newModel) {
    // var store = createStore(combineReducers(Object.assign(createReducer(model),{routing: routerReducer})));
    store = createReduxStore(createReducer(newModel));
    // Object.assign(model, props);
    model = newModel;
    console.log(newModel);
    Reduxify(store, newModel);
    return store;
    // return connect(state => Object.assign({}, state, {model}));
}

export var connectModel = connect(state => Object.assign({}, state, {model}));

export function bindModel (f) {
    connect()
    // connectedComponents.push(component);
    return m(component);
}