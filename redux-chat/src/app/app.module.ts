import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import {
  createStore,
  Store,
  StoreEnhancer,
} from "redux";

import { AppState } from "./app.state";

import { AppComponent } from './app.component';

import { counterReducer } from "./reducer/counter-reducer";

import { AppStore } from "./app-store";

let devtools: StoreEnhancer<AppState> = window["devToolsExtension"] ? window["devToolsExtension"]() : f => f;
let store: Store<AppState> = createStore<AppState>(counterReducer, devtools);

import { CounterComponent } from "./component/counterComponent/counter.component";

@NgModule({
  declarations: [
    AppComponent,
    CounterComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [
    {provide: AppStore, useValue: store},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }


