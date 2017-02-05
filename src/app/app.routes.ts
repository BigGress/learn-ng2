import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { AuthGuardService } from "./core/auth-guard.service";

import { LoginComponent } from './login/login.component';

export const routes: Routes = [
      {
        path: "",
        redirectTo: "login",
        pathMatch: "full"
      },
      // {
      //   path: "login",
      //   component: LoginComponent,
      // },
      {
        path: "todo",
        redirectTo: "todo/ALL",
      }
    ]

export const routing = RouterModule.forRoot(routes);

@NgModule({
  imports: [
    routing
  ],
  exports: [
    RouterModule
  ],
  providers: [],
})
export class RouteringModule { }
