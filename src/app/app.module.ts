import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from "@angular/router";
import { MdlModule } from "angular2-mdl";

import { TodoModule } from "./todo/todo.module";

import { AppComponent } from './app.component';
// import { LoginComponent } from './login/login.component';
import { RouteringModule } from "./app.routes";
import { LoginModule } from "./login/login.module";

import { AuthService } from "./service/auth/auth.service";
import { CoreModule } from "./core/core.module";

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    MdlModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    RouteringModule,
    TodoModule,
    CoreModule,
    ReactiveFormsModule,
    LoginModule,
  ],
  providers: [
    {provide: "auth", useClass: AuthService}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
