import { Action, Reducer, Store, createStore } from "redux";

interface AddMessageAction extends Action {
    message: string;
}

interface DeleteMessageAction extends Action {
    idx: number;
}

let initState = {messages: []}

let reducer = (state = initState, action: Action) => {
    switch(action.type) {
        case "ADD_MESSAGE":
            return {
                messages: state.messages.concat((<AddMessageAction>action).message)
            }
        case "DELETE_MESSAGE": 
            let idx = (<DeleteMessageAction>action).idx;
            return {
                message: [
                    ...state.messages.slice(0, idx),
                    ...state.messages.slice(idx + 1, state.messages.length),
                ]
            }

    }
}

let store = createStore(reducer);

store.dispatch({
    type: "ADD_MESSAGE",
    message: "第一条数据"
} as AddMessageAction);
store.dispatch({
    type: "ADD_MESSAGE",
    message: "第二条数据"
} as AddMessageAction);

console.log(store.getState())