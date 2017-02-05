import { Injectable, Inject } from '@angular/core';
import { Http, Headers, Response } from "@angular/http";

import { Auth, User } from "../../domain/entities";

import { ReplaySubject, Observable } from "rxjs/Rx";
import "rxjs/add/operator/map";

@Injectable()
export class AuthService {
  auth: Auth = {hasError: true, redirectUrl: '', errMsg: 'not logged in', user: undefined};
  subject: ReplaySubject<Auth> = new ReplaySubject<Auth>(1);

  constructor(
    private http: Http,
    @Inject("user") private userService
  ) {

  }

  getAuth() {
    return this.subject.asObservable();
  }

  unAuth() {
    this.auth = Object.assign(
      {},
      this.auth,
      {user: null, hasError: true, redirectUrl: '', errMsg: 'not logged in'}
    );

    return this.subject.next(this.auth);
  }

  register(username: string, password: string) {
    let AddUser = {
      username,
      password
    };

    return this.userService.findUser(username)
                .filter(user => user === null)
                .switchMap(user => {
                  return this.userService.addUser(AddUser)
                             .map(u => {
                               this.auth = Object.assign(
                                 {},
                                  { user: u, hasError: false, errMsg: null, redirectUrl: null}
                               )
                               this.subject.next(this.auth);
                               return this.auth;
                             })
                })
  }

  loginWithCre(user: string, password: string) {
    return this.userService.findUser(user)
              .map(userObj => {
                let auth = new Auth();
                localStorage.removeItem("userId");
                let redirectUrl = (localStorage.getItem("redirectUrl") === null) ? "/" : localStorage.getItem("redirectUrl");
                auth.redirectUrl = redirectUrl;

                if (null === userObj) {
                  auth.hasError = true;
                  auth.errMsg = "user no found";
                } else if (password === userObj.password) {
                  auth.user = Object.assign({},userObj);
                  auth.hasError = false;
                  localStorage.setItem("userId", userObj.id)
                } else {
                  auth.hasError = true;
                  auth.errMsg = "password no match";
                }

                this.auth = Object.assign({}, auth);
                this.subject.next(this.auth);

                return auth;
              })
      // .then((userObj) => {
      //   let auth = new Auth();
      //   localStorage.removeItem("userId");
      //   let redirectUrl = (localStorage.getItem("redirectUrl") === null) ? "/" : localStorage.getItem("redirectUrl");
      //   auth.redirectUrl = redirectUrl;

      //   if (null === userObj) {
      //     auth.hasError = true;
      //     auth.errMsg = "user no found";
      //   } else if (password === userObj.password) {
      //     auth.user = Object.assign({},userObj);
      //     auth.hasError = false;
      //     localStorage.setItem("userId", userObj.id)
      //   } else {
      //     auth.hasError = true;
      //     auth.errMsg = "password no match";
      //   }

      //   return auth;
      // })
      // .catch(this.handleError)
  }
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
