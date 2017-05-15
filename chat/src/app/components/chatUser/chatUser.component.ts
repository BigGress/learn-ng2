import { Component, OnInit } from '@angular/core';

import { UserService, UserModel } from "../../../services";

@Component({
  moduleId: module.id,
  selector: "chat-user",
  styleUrls: ["./chatUser.component.scss"],
  templateUrl: "./chatUser.component.html"
})

export class ChatUserComponent implements OnInit {
  constructor(
    private service: UserService
  ) { }

  ngOnInit() {
  }

  addUser(name: string) {
    this.service.addUser(
      new UserModel(name, Date.now())
    );
  }

  setCurrentUser(user: UserModel) {
    this.service.setCurrentUser(user);
  }
}
