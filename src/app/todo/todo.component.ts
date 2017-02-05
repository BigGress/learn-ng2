import { Component, OnInit, Inject } from '@angular/core';
import { Router, ActivatedRoute, Params } from "@angular/router";
import { UUID } from "angular2-uuid";
import { Todo } from "../domain/entities";

import { TodoServiceService } from "./todo-service.service";

@Component({
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
  providers: [],
})
export class TodoComponent implements OnInit {
  todos: Todo[] = [];

  desc: string = "";

  constructor(
    @Inject("todoService") private service: TodoServiceService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.params.forEach((params: Params) => {
      let filter = params["filter"];
      this.filterTodos(filter);
    })
  }

  filterTodos(filter: string) {
    this.service.filterTodos(filter)
        .then(todos => this.todos = [...todos]);

  }

  getTodo() {
    return this.service.getTodos()
      .then(todos => this.todos = todos);
  }

  changeDesInput(input: string) {
    this.desc = input;

  }

  addTodo(isEnter: boolean) {

    this.service.addTodo(this.desc).then(todo => {
      this.todos = [...this.todos,todo];
      this.desc = "";
    });
  }

  toggleTodo(todo: Todo) {
    let i = this.todos.indexOf(todo);
    console.log(todo)
    return this.service.toggleTodo(todo)
        .then(res => {
          this.todos = [
            ...this.todos.slice(0,i),
            res,
            ...this.todos.slice(i+1)
          ];
          return null;
        })
  }

  deleteTodo(todo: Todo) {
    let i = this.todos.indexOf(todo);
    return this.service.deleteTodo(todo)
      .then(() => {
        this.todos = [
          ...this.todos.slice(0,i),
          ...this.todos.slice(i+1)
        ];
        return null;
      })
  }

  toggleAll() {
    Promise.all(this.todos.map(e => this.toggleTodo(e)));
  }

  clearAllCompleted() {
    const completedTodos = this.todos.filter(e => e.completed);
    const activeTodos = this.todos.filter(e => !e.completed);

    Promise.all(completedTodos.map(e => this.service.deleteTodo(e)))
      .then(() => this.todos = [...activeTodos]);
  }

}
