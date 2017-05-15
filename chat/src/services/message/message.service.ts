import {
  Injectable
} from '@angular/core';

import { BehaviorSubject, Observable, Subject } from "rxjs";

import { MessageModel } from "./message.model";
import { UserModel } from "../";

@Injectable()
export class MessageService {

  newMessage: BehaviorSubject<MessageModel> = new BehaviorSubject<MessageModel>(null);

  public messages: Observable<any>;

  updates: Subject<any> = new Subject<any>();

  creater: Subject<MessageModel> = new Subject<MessageModel>();

  markThreadAsRead: Subject<any> = new Subject<any>();

  constructor() {
    this.messages = this.updates.scan((messages, newMessage) => {
      return messages.concat(newMessage);
    }, [])
    .publishReplay(1)
    .refCount();

    // 获取最后一个值
    this.messages
    .map((e, i) => {
      return e.length === i + 1 && e[i];
    })
    .subscribe(this.newMessage);
  }

  addMessage(message: MessageModel) {
    this.updates.next([message]);
  }

  messageForUser(user: UserModel) {
    return this.messages.map((message: MessageModel[]) => {
      return message.filter(e => {
        if (user) {
          if (e.author && e.author.id === user.id) {
            return true;
          }

          if (e.thread && e.thread.id === user.id) {
            return true;
          }
        }

        return false;
      });
    });
  }

  messagesForThreadUser(thread, user) {
    return this.newMessage.filter((message: MessageModel) => {
      return message.thread.id === thread.id && message.author.id !== user.id;
    })
  }
}
