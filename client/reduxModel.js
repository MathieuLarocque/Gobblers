import { createStore } from 'redux';

export function reduxify (model) {

    var store;
    var _dispatcher = {};

    function reducer (state = {}, action) {
        var { type, method, newState } = action;
        if (method && newState) {
            throw new Error('An action should not contain an method and a newState at the same time.');
        } else if (newState !== undefined) {
            return Object.assign({}, state, {[type]: newState});
        } else if (method !== undefined) {
            var args = [].concat(action.args);
            var value = model[type][method].apply(model[type], args);
            if (value !== undefined) {
                return Object.assign({}, state, {[type]: value});
            }
        }
        return state;
    }

    if (store !== undefined) {
        throw new Error('You cannot call reduxify more than once.');
    }
    store = createStore(reducer);
    var propNames = Object.keys(model);
    propNames.map(prop => {
        _dispatcher[prop] = {};
        var methodNames = Object.keys(model[prop]);
        methodNames.map(method => {
            if (typeof model[prop][method] === 'function') {
                _dispatcher[prop][method] = (...args) => store.dispatch({ type: prop, method, args });
            } else {
                throw new Error('All properties of the model should be methods');
            }
        });
        var getState = () => store.getState()[prop];
        var setState = newState => store.dispatch({ type: prop, newState });
        model[prop].getState = getState;
        _dispatcher[prop].getState = getState;
        model[prop].setState = setState;
        _dispatcher[prop].setState = setState;
    });
    return { model: _dispatcher, store };
}














export function addPlugin (plugin) {
    if (plugin && plugin.dependencies && plugin.listener) {
        if (typeof plugin.listener !== 'function' || typeof plugin.listener !== 'array') {
            throw new Error('Plugin properties of wrong type.');
        } else {
            for (var i in plugin.dependencies) {
                listeners[plugin.dependencies[i]] = plugin.listener;
            }
        }
    }
} 

