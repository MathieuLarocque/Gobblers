import io from 'socket.io-client';
export var socket = io(':3001');
socket.onIfMounted = function (comp, eventName, listener) {
    if (typeof comp.componentWillMount === 'function') {
        var compComponentWillMount = comp.componentWillMount;
        comp.componentWillMount = function () {
            socket.on(eventName, listener);
            compComponentWillMount.call(comp);
        }
    } else {
        comp.componentWillMount = function () {
            socket.on(eventName, listener);
        }
    }
    if (typeof comp.componentWillUnmount === 'function') {
        var compComponentWillUnmount = comp.componentWillUnmount;
        comp.componentWillUnmount = function () {
            socket.off(eventName, listener);
            compComponentWillUnmount.call(comp);
        }
    } else {
        comp.componentWillUnmount = function () {
            socket.off(eventName, listener);
        }
    }
    return socket;
}
export default socket;