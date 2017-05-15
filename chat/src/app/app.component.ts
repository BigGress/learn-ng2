import { Component } from '@angular/core';

import { MessageService, UserService, DataService } from "../services";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';

  constructor(
    public users: UserService,
    public messages: MessageService,
    data: DataService
  ) {}
}
