import { Component, OnInit, Inject } from '@angular/core';
import { AppStore } from "../../app-store";
import {
  AppState,
  getUnreadMessageCount,
} from "../../../app-redux";


@Component({
  moduleId: module.id,
  selector: 'chat-nav-bar',
  templateUrl: './nav.component.html'
})

export class NavComponent {
  count: number = 0;

  constructor(
    @Inject(AppStore) private store
  ) {
    store.subscribe(() => {
      this.updateState();
    });

    this.updateState();
  }

  updateState() {
    this.count = getUnreadMessageCount(this.store.getState());
  }
}
