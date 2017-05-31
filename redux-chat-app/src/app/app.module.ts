import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import {
  createStore,
  Store,
  compose,
  StoreEnhancer,
} from "redux";

import { AppComponent } from './app.component';

import { AppStore } from "./app-store";

import { AppState, rootReducer } from "../app-redux";

import { ChatExampleData } from "./init-data";


let devtools: StoreEnhancer<AppState> =
  window["devToolsExtension"] ? window["devToolsExtension"]() : f => f;

let store: Store<AppState> = createStore<AppState>(
  rootReducer,
  compose(devtools)
);

import { NavComponent } from "./components/ChatNavBar/nav.component";
import { ThreadComponent } from "./components/ChatThreads/thread.component";
import { WindowComponent } from "./components/ChatWindow/window.component";

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    ThreadComponent,
    WindowComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [
    {provide: AppStore, useFactory: () => store}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(
    @Inject(AppStore) store
  ) {
    ChatExampleData(store);
  }
}
