import { Component, OnInit, Inject } from '@angular/core';
// import { Store } from "redux";
import { AppStore } from "../../app-store";
import { AppState } from "../../app.state";
import { increment, decrement, DECREMENT, INCREMENT } from "../../reducer/counter-action-creators";

@Component({
  selector: "counter-component",
  templateUrl: "./counter.component.html"
})

export class CounterComponent implements OnInit {
  counter: number = 0;

  constructor(
    @Inject(AppStore) private store
  ) {
    store.subscribe(() => this.readState());
    this.readState();
  }

  readState() {
    let state: AppState = this.store.getState() as AppState;
    this.counter = state.counter;
  }

  ngOnInit() { }

  increment() {
    this.store.dispatch(increment());
  }

  decrement() {
    this.store.dispatch(decrement());
  }
}
