import {
  Component,
  OnInit
} from '@angular/core';

import { MessageService, MessageModel, UserModel } from "../../../services";

@Component({
  selector: "chat-bar",
  styleUrls: ["./charBar.component.scss"],
  templateUrl: "./charBar.component.html"
})

export class BarComponent implements OnInit {
  noReadCount = 0;

  constructor(
    private messages: MessageService
  ) {
    this.messages.messages
    // .filter((e: MessageModel) => {
    //   return e.isRead;
    // })
    .subscribe(e => {
      this.noReadCount = e.length;
    });
  }

  ngOnInit() {

  }
}
