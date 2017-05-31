import {
  Action
} from "redux";
import { User } from "../model";
import {
  SET_CURRENT_USER,
  SetCurrentUserAction
} from "./UserAction";
import { createSelector } from "reselect";


export interface UsersState {
  currentUser: User;
}

const initalState: UsersState = {
  currentUser: null
};

export const UsersReducer =
  (state: UsersState = initalState, action: Action): UsersState => {
    switch (action.type) {
      case SET_CURRENT_USER:
        const user: User = (<SetCurrentUserAction>action).user;
        return {
          currentUser: user,
        };
      default:
        return state;
    }
  };

  export const getUsersState = (state): UsersState => state.users;

  export const getCurrentUser = createSelector(
    getUsersState,
    (state: UsersState) => state.currentUser,
  );
