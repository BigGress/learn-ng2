export interface Action {
    type: string;
    payload?: any;
}

export interface Reducer<T> {
    (state: T, action: Action): T;
}

export interface ListenerCallback {
    (): void;
}

export interface UnsubscribeCallback {
    (): void;
}

let reducer: Reducer<number> = (state: number, action: Action) => {

    switch (action.type) {
        case "test":
            return state - 1;
        case "test1":
            return state + 1
        case "plus":
            return state + action.payload;
        default:
            return state;
    }

}

// let initAction: Action = {type: "test"}

// console.log(reducer(2, initAction));

// let initPlusAction: Action = {type: "plus", payload: 123}

// console.log(reducer(100, initPlusAction))

export class Store<T> {
    private _state: T;
    private _listeners: ListenerCallback[] = [];

    constructor(
        private reducer: Reducer<T>,
        initState
    ) {
        this._state = initState
    }

    getState(): T {
        return this._state;
    }

    dispatch(action: Action): void {
        this._state = this.reducer(this._state, action);
        this._listeners.forEach(e => e());
    }

    subscribe(listener: ListenerCallback): UnsubscribeCallback {
        this._listeners.push(listener);
        return () => {
            this._listeners = this._listeners.filter(e => e !== listener);
        }
    }
}

let test1 = new Store(reducer, 0);

let unsubscrbe = test1.subscribe(() => {
    console.log("我变化了", test1.getState());
})
console.log(test1.dispatch({ type: "test" }))
console.log(test1.dispatch({ type: "test1" }))