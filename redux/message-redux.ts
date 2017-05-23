import { Action, Reducer, ListenerCallback, UnsubscribeCallback } from "./index";

interface AddMessageAction extends Action {
    message: string;
}

interface DeleteMessageAction extends Action {
    idx: number;
}



let reducer = (state, action: Action) => {
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
export class Store<T> {
    private messages: T;
    private _listeners: ListenerCallback[] = [];

    constructor(
        private reducer: Reducer<T>,
        initState
    ) {
        this.messages = initState;
    }

    getState(): T {
        return this.messages;
    }

    dispatch(action: Action): void {
        this.messages = this.reducer(this.messages, action);
        this._listeners.forEach(e => e());
    }

    subscribe(listener: ListenerCallback): UnsubscribeCallback {
        this._listeners.push(listener);
        return () => {
            this._listeners = this._listeners.filter(e => e !== listener);
        }
    }
}

let store = new Store(reducer, {messages: []});

store.dispatch({
    type: "ADD_MESSAGE",
    message: "第一条数据"
} as AddMessageAction);
store.dispatch({
    type: "ADD_MESSAGE",
    message: "第二条数据"
} as AddMessageAction);

console.log(store.getState())