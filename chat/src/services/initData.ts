import { Injectable } from '@angular/core';

import { MessageModel, UserModel, UserService, MessageService } from "./";

@Injectable()
export class DataService {

  constructor(
    private users: UserService,
    private messages: MessageService
  ) {
    let botUsers = new UserModel("第一个机器人", 1);
    let testUsers = new UserModel("第二个机器人", 2);

    let firstMessage = new MessageModel(0, "第一条消息", false, botUsers, new Date());
    let secondMessage = new MessageModel(1, "第二条消息", false, testUsers, new Date());

    messages.addMessage(firstMessage);
    messages.addMessage(secondMessage);

    users.addUser(botUsers);
    users.addUser(testUsers);


    // messages.messages.subscribe(e => {
    //   console.log(e)
    // });
  }
}
