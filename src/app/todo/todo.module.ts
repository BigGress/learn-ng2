import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { HttpModule } from "@angular/http";
import { FormsModule } from "@angular/forms";
import { MdlModule } from "angular2-mdl";

import { SharedModule } from "../shared/shared.module";

import { TodoRoutingModule } from "./todo.routes";

import { TodoServiceService } from "./todo-service.service";
import { TodoComponent } from './todo.component';
import { TodoFooterComponent } from './todo-footer/todo-footer.component';
import { TodoHeaderComponent } from './todo-header/todo-header.component';
import { TodoItemComponent } from './todo-item/todo-item.component';
import { TodoListComponent } from './todo-list/todo-list.component';

@NgModule({
  imports: [
    HttpModule,
    TodoRoutingModule,
    SharedModule,
  ],
  exports: [],
  declarations: [
    TodoComponent,
    TodoFooterComponent,
    TodoHeaderComponent,
    TodoItemComponent,
    TodoListComponent,
  ],
  providers: [
    {provide: "todoService", useClass: TodoServiceService}
  ],
})
export class TodoModule { }

