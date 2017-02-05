import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Todo } from "../../domain/entities";

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  @Input() todos: Todo[];

  @Output() onRemoveTodo = new EventEmitter<Todo>();
  @Output() onToggleTodo = new EventEmitter<Todo>();
  @Output() onToggleAllTodo = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() {
  }

  onRemoveTriggered(todo: Todo) {
    console.log(todo)
    this.onRemoveTodo.emit(todo);
  }

  onToggleTriggered(todo: Todo) {
    this.onToggleTodo.emit(todo);
  }

  toggleAll() {
    this.onToggleAllTodo.emit(true);
  }

}
