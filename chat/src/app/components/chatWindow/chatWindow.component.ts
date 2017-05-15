import { Component, OnInit, ElementRef } from '@angular/core';

import { MessageService, UserService, UserModel, MessageModel } from "../../../services";

@Component({
  moduleId: module.id,
  selector: "chat-window",
  styleUrls: ["./chatWindow.component.scss"],
  templateUrl: "./chatWindow.component.html"
})

export class ChatWindowComponent implements OnInit {
  cUser: UserModel;

  self: UserModel;

  messages: any;

  constructor(
    public service: MessageService,
    public user: UserService,
    public el: ElementRef
  ) { }

  ngOnInit() {
    this.user.currentUser.subscribe(e => {
      this.cUser = e;
      // this.messages = this.service.messageForUser(this.cUser);

      // this.scrollToBottom();
    });

    this.service.newMessage.subscribe(e => {
      this.messages = this.service.messageForUser(this.cUser);

      this.scrollToBottom();
    });
  }

  sendMessage(message: HTMLInputElement) {

    if (message.value) {
      this.service.addMessage(
        new MessageModel(Date.now(), message.value, true, this.self, new Date(), this.cUser)
      );

      message.value = "";
    }
  }

  login(name: string) {
    this.self = new UserModel(name, Date.now());
    this.messages = this.service.messageForUser(this.cUser);
  }

  scrollToBottom() {
    let dom: HTMLElement = this.el.nativeElement.querySelector("#message-list");

    if (dom) {
      setTimeout(() => {
        dom.scrollTop = dom.scrollHeight;
      });
    }
  }
}
