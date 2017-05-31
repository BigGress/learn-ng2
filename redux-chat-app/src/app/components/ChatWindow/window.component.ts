import { Component, OnInit, Inject, ElementRef } from '@angular/core';

import { Thread, User } from "../../../app-redux/model";

import { AppStore } from "../../app-store";

import { getCurrentThread, getCurrentUser, addMessage } from "../../../app-redux";

@Component({
  moduleId: module.id,
  selector: 'chat-window',
  templateUrl: './window.component.html',
})

export class WindowComponent implements OnInit {
  currentThread: Thread;
  drafmessage: {text: string} = {text: ""};
  currentUser: User;

  constructor(
    @Inject(AppStore) private store,
    private el: ElementRef
  ) {
    store.subscribe(() => this.updateState());
    this.updateState();
  }

  ngOnInit() { }

  updateState() {
    let state = this.store.getState();
    this.currentThread = getCurrentThread(state);
    console.log(this.currentThread);

    this.currentUser = getCurrentUser(state);
    this.scrollToBottom();
  }

  scrollToBottom() {
    let box: HTMLElement = this.el.nativeElement.querySelector(".message-box");
    if (box) {
      box.scrollTop = box.scrollHeight;
    }
  }

  sendMessage() {
    this.store.dispatch(addMessage(this.currentThread,{
      author: this.currentUser,
      isRead: true,
      text: this.drafmessage.text
    }));

    this.drafmessage = {text: ""};
  }

  onEnter() {
    this.sendMessage();
  }
}
