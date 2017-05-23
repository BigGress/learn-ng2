"use strict";
var reducer = function (state, action) {
    switch (action.type) {
        case "ADD_MESSAGE":
            return {
                messages: state.messages.concat(action.message)
            };
        case "DELETE_MESSAGE":
            var idx = action.idx;
            return {
                message: state.messages.slice(0, idx).concat(state.messages.slice(idx + 1, state.messages.length))
            };
    }
};
var Store = (function () {
    function Store(reducer, initState) {
        this.reducer = reducer;
        this._listeners = [];
        this.messages = initState;
    }
    Store.prototype.getState = function () {
        return this.messages;
    };
    Store.prototype.dispatch = function (action) {
        this.messages = this.reducer(this.messages, action);
        this._listeners.forEach(function (e) { return e(); });
    };
    Store.prototype.subscribe = function (listener) {
        var _this = this;
        this._listeners.push(listener);
        return function () {
            _this._listeners = _this._listeners.filter(function (e) { return e !== listener; });
        };
    };
    return Store;
}());
exports.Store = Store;
var store = new Store(reducer, { messages: [] });
store.dispatch({
    type: "ADD_MESSAGE",
    message: "第一条数据"
});
store.dispatch({
    type: "ADD_MESSAGE",
    message: "第二条数据"
});
console.log(store.getState());
