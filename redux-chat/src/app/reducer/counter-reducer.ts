import { Reducer, Action } from "redux";
import {
  INCREMENT,
  DECREMENT
} from "./counter-action-creators";

import { AppState } from "../app.state";

let initialState: AppState = { counter: 0 };

export const counterReducer: Reducer<AppState> = (state: AppState = initialState, action: Action): AppState => {
  switch (action.type) {
    case INCREMENT:
      return Object.assign({}, state, { counter: state.counter + 1 });
    case DECREMENT:
      return Object.assign({}, state, {counter: state.counter - 1});
    default:
      return state;
  }
};
