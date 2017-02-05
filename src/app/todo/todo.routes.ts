import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { TodoComponent } from "./todo.component";

import { AuthGuardService } from "../core/auth-guard.service";
export const routes: Routes = [
      {
        path: "todo/:filter",
        component: TodoComponent,
        // canActivate: [AuthGuardService]
      }]

export const routing = RouterModule.forChild(routes);


@NgModule({
  imports: [
    routing
  ],
  exports: [
    RouterModule
  ]
})
export class TodoRoutingModule {}
