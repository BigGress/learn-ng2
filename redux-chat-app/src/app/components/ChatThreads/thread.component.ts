import { Component, OnInit, Inject } from '@angular/core';
import { AppStore } from "../../app-store";
import {
  AppState,
  getAllThreads,
  getCurrentThread,
  selectThread
} from "../../../app-redux";
import { Thread } from "../../../app-redux/model";
// import { Store } from "redux";

@Component({
  moduleId: module.id,
  selector: "chat-threads",
  templateUrl: './thread.component.html'
})

export class ThreadComponent implements OnInit {
  threads: Thread[] = [];
  currentThreadId: string;

  constructor(
    @Inject(AppStore) private store
  ) {
    store.subscribe(() => {
      this.updateState();
    });
    this.updateState();
  }

  ngOnInit() { }

  updateState() {
    let state = this.store.getState();
    this.threads = getAllThreads(state);
    console.log(this.threads);

    this.currentThreadId = getCurrentThread(state) ? getCurrentThread(state).id : undefined;
  }

  handleThreadClicked(thread: Thread) {
    this.store.dispatch(selectThread(thread));
  }
}
