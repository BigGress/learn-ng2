import { Component, Inject, OnInit } from '@angular/core';
import { Router } from "@angular/router";

import { UserServiceService } from "./core/user-service.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'ng cli worked';
  constructor(
    private router: Router,
    @Inject("auth") private auth,
    @Inject("user") private userService: UserServiceService

  ) {
  }

  ngOnInit() {
    let id = parseInt(localStorage.getItem("userId"), 10);
    if (id) {
      this.userService.getUser(id).subscribe(e => {
        this.auth.user = e;
      })
    }
  }

  login() {
    console.log(123);

    this.router.navigate(["/login"]);
  }

  logout() {
    localStorage.removeItem("userId");
  }
}
