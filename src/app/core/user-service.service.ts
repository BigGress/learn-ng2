import { Injectable } from '@angular/core';
import { Http, Headers, Response } from "@angular/http";

import { User } from "../domain/entities";

import 'rxjs/add/operator/map';

@Injectable()
export class UserServiceService {

  private api_url = "http://localhost:3000/user"

  constructor(
    private http: Http
  ) { }

  getUser(userId: number) {
    return this.http.get(`${this.api_url}/${userId}`)
                .map(res => res.json() as User);
  }

  findUser(user: string) {
    return this.http.get(`${this.api_url}?username=${user}`)
                .map(res => {
                  let users = res.json() as User[];
                  return users.length > 0 ? users[0] : null;
                })
          // .toPromise()
          // .then(res => {
          //   let users = res.json() as User[];
          //   return users.length > 0 ? users[0] : null;
          // })
          // .catch(this.handleError)
  }

  addUser(user) {
    return this.http.post(this.api_url,JSON.stringify(user),{headers: new Headers({
      "Content-Type": "application/json"
    })}).map(res => res.json() as User)
  }
}
