import {
  Reducer,
  combineReducers
} from 'redux';
import {
  ThreadState,
  ThreadReducer,
} from "./thread/ThreadReducer";
import {
  UsersState,
  UsersReducer
} from "./user/UserReducer";

export * from "./thread/ThreadAction";
export * from "./thread/ThreadReducer";
export * from "./user/UserAction";
export * from "./user/UserReducer";


export interface AppState {
  users: UsersState;
  threads: ThreadState;
}

export const rootReducer: Reducer<AppState> = combineReducers<AppState>({
  users: UsersReducer,
  threads: ThreadReducer,
});
