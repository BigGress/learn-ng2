"use strict";
var reducer = function (state, action) {
    switch (action.type) {
        case "test":
            return state - 1;
        case "test1":
            return state + 1;
        case "plus":
            return state + action.payload;
        default:
            return state;
    }
};
// let initAction: Action = {type: "test"}
// console.log(reducer(2, initAction));
// let initPlusAction: Action = {type: "plus", payload: 123}
// console.log(reducer(100, initPlusAction))
var Store = (function () {
    function Store(reducer, initState) {
        this.reducer = reducer;
        this._listeners = [];
        this._state = initState;
    }
    Store.prototype.getState = function () {
        return this._state;
    };
    Store.prototype.dispatch = function (action) {
        this._state = this.reducer(this._state, action);
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
var test1 = new Store(reducer, 0);
var unsubscrbe = test1.subscribe(function () {
    console.log("我变化了", test1.getState());
});
console.log(test1.dispatch({ type: "test" }));
console.log(test1.dispatch({ type: "test1" }));
