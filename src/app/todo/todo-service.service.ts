import { Injectable } from '@angular/core';
import { Headers, Http } from "@angular/http";
import { UUID } from "angular2-uuid";
import { Todo } from "../domain/entities";

import 'rxjs/add/operator/toPromise';

@Injectable()
export class TodoServiceService {
  private api_url = "http://localhost:3000/todos";
  private headers = new Headers({'Content-type': 'application/json'})

  constructor(
    private http: Http
  ) { }

  addTodo(desc: string) {
    const userId:number = +localStorage.getItem('userId');
    let todo = {
      id: UUID.UUID(),
      desc: desc,
      completed: false,
      userId
    };
    return this.http
              .post(this.api_url,JSON.stringify(todo),{headers: this.headers})
              .toPromise()
              .then(e => e.json() as Todo)
              .catch(this.handleError)
  }

  toggleTodo(todo: Todo) {
    const url = `${this.api_url}/${todo.id}`;
    let updatedTodo = Object.assign({},todo, {completed: !todo.completed});
    return this.http
            .put(url, JSON.stringify(updatedTodo), {headers: this.headers})
            .toPromise()
            .then(() => updatedTodo)
            .catch(this.handleError)
  }

  deleteTodo(todo: Todo) {
    const url = `${this.api_url}/${todo.id}`;
    return this.http.delete(url, {headers: this.headers})
              .toPromise()
              .then(() => null)
              .catch(this.handleError)
  }

  filterTodos(filter: string) {
    const userId:number = +localStorage.getItem('userId');
    let url = `${this.api_url}?userId=${userId}`
    switch (filter) {
      case "ACTIVE":
        return this.http.get(`${url}&completed=false`)
                .toPromise()
                .then(res => res.json() as Todo[])
                .catch(this.handleError);
      case "COMPLETED":
        return this.http.get(`${url}&completed=true`)
                  .toPromise()
                  .then(res => res.json() as Todo[])
                  .catch(this.handleError);
      default:
        return this.getTodos();
    }
  }

  getTodos() {
    const userId:number = +localStorage.getItem('userId');
    return this.http.get(`${this.api_url}?userId=${userId}`)
              .toPromise()
              .then(res => res.json() as Todo[])
              .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
