import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnInit {

  @Input() todoDesc: string;
  @Input() isChecked: boolean;

  @Output() onRemoveTriggered = new EventEmitter<boolean>();
  @Output() onToggleTriggered = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() {
  }

  deleteTodo() {
    this.onRemoveTriggered.emit(true);
  }

  toggleTodo() {
    this.onToggleTriggered.emit(true);
  }
}
