import {
  Injectable
} from "@angular/core";

import { BehaviorSubject, Observable, Subject } from "rxjs";

import { UserModel } from "./user.model";

@Injectable()
export class UserService {

  public users: Observable<any>;

  public newUser: BehaviorSubject<UserModel> = new BehaviorSubject(null);

  public updates = new Subject<any>();

  public currentUser: BehaviorSubject<UserModel> = new BehaviorSubject<UserModel>(null);

  constructor() {
    this.users = this.updates.scan((users, user) => {
      return users.concat(user);
    }, [])
    .publishReplay(1)
    .refCount();

    this.users.subscribe(this.newUser);
  }

  /**
   * 设置用户信息
   *
   * @param {UserModel} user
   *
   * @memberof UserService
   */
  public setCurrentUser(user: UserModel) {
    console.log(user)
    this.currentUser.next(user);
  }

  public addUser(user: UserModel) {
    // this.newUser.next(user);
    this.updates.next([user])
  }
}
