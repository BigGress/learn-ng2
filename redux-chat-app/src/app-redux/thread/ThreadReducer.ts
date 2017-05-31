import {
  Action
} from "redux";
import { Thread } from "../model";
import {
  AddMessageAction,
  ADD_MESSAGE,
  addMessage,
  AddThreadAction,
  ADD_THREAD,
  addThread,
  SelectThreadAction,
  SELECT_THREAD,
  selectThread,
} from "./ThreadAction";

import { createSelector } from "reselect";

export interface THreadEntities {
  [id: string]: Thread;
}

export interface ThreadState {
  ids: string[];
  entities: THreadEntities;
  currentThreadId?: string;
}

const initState: ThreadState = {
  ids: [],
  currentThreadId: null,
  entities: {},
};

export const ThreadReducer =
  (state: ThreadState = initState, action: Action): ThreadState => {
    switch (action.type) {
      case ADD_THREAD: {
        const thread = (<AddThreadAction>action).thread;
        if (state.ids.includes(thread.id)) {
          return state;
        }

        return {
          ids: [...state.ids, thread.id],
          currentThreadId: state.currentThreadId,
          entities: Object.assign({}, state.entities, {
            [thread.id]: thread,
          })
        };
      }
      case ADD_MESSAGE: {
        const thread = (<AddMessageAction>action).thread;
        const message = (<AddMessageAction>action).message;

        const isRead = message.thread.id === state.currentThreadId ?
                    true : message.isRead;
        const newMessage = Object.assign({}, message, {isRead: isRead});

        const oldThread = state.entities[thread.id];

        const newThread = Object.assign({}, oldThread, {
          messages: [...oldThread.messages, newMessage],
        });

        return {
          ids: state.ids,
          currentThreadId: state.currentThreadId,
          entities: Object.assign({}, state.entities, {
            [thread.id]: newThread
          })
        };
      }

      case SELECT_THREAD: {
        const thread = (<SelectThreadAction>action).thread;
        const oldThread = state.entities[thread.id];
        const newMessages = oldThread.messages.map(e => {
          return Object.assign({}, e, {isRead: true});
        });

        const newThread = Object.assign({}, oldThread, {
          messages: newMessages
        });

        return {
          ids: state.ids,
          currentThreadId: thread.id,
          entities: Object.assign({}, state.entities, {
            [thread.id]: newThread,
          })
        }
      }

      default:
        return state;
    }
  };

  export const getThreadsSate = (state): ThreadState => state.threads;

  export const getThreadsEntities = createSelector(
    getThreadsSate,
    (state: ThreadState) => state.entities,
  );

  export const getAllThreads = createSelector(
    getThreadsEntities,
    ( entities: THreadEntities ) => Object.keys(entities)
                                      .map(e => entities[e]),
  );

  export const getUnreadMessageCount = createSelector(
    getAllThreads,
    (threads: Thread[]) => threads.reduce((unReadCount: number, thread: Thread) => {
      thread.messages.forEach(e => {
        if (!e.isRead) {
          ++unReadCount;
        }
      });

      return unReadCount;
    }, 0)
  );

  export const getCurrentThread = createSelector(
    getThreadsEntities,
    getThreadsSate,
    (entities: THreadEntities, state: ThreadState) => {
      return entities[state.currentThreadId];
    }
  );

  export const getAllMessages = createSelector(
    getAllThreads,
    (threads: Thread[]) => {
      return threads.reduce((messages, thread) => {
        return [...messages, ...thread.messages];
      }, [])
      .sort((m1, m2) => m1.sentAt - m2.sentAt);
    }
  );
