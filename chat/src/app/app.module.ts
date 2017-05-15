import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';

import { MessageService, UserService, DataService } from "../services";

import { BarComponent } from "./components/chatBar/chatBar.component";
import { ChatUserComponent } from "./components/chatUser/chatUser.component";
import { ChatWindowComponent } from "./components/chatWindow/chatWindow.component";

@NgModule({
  declarations: [
    AppComponent,
    BarComponent,
    ChatUserComponent,
    ChatWindowComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [
    MessageService,
    UserService,
    DataService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
