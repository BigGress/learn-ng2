import { UserService } from "./user.service";
import { UserModel } from "./user.model";
import {  } from "@angular/core/testing";

describe("UserService", () => {
  let userService = new UserService();
  let user = new UserModel("test", Date.now());
  it("add user", () => {
    let nextUser = new UserModel("user2", Date.now());
    let index = 0;

    userService.updates.subscribe(e => {
      let name;
      if (index === 0) {
        name = user.name;
      } else {
        name = nextUser.name;
      }
      expect(e[0].name).toEqual(name);
      index++;
    });

    userService.addUser(user);
    userService.addUser(nextUser);
  });

  it("get user", () => {
    userService.users.subscribe(e => {
      expect(e.length).toEqual(2);
    });
  });

  it("set current user", () => {
    userService.setCurrentUser(user);
    userService.currentUser.subscribe(e => {
      expect(e.id).toEqual(user.id);
    });
  });
});
