"use strict";
var redux_1 = require("redux");
var initState = { messages: [] };
var reducer = function (state, action) {
    if (state === void 0) { state = initState; }
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
var store = redux_1.createStore(reducer);
store.dispatch({
    type: "ADD_MESSAGE",
    message: "第一条数据"
});
store.dispatch({
    type: "ADD_MESSAGE",
    message: "第二条数据"
});
console.log(store.getState());
