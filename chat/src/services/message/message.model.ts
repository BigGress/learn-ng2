import { UserModel } from "../user/user.model"

export class MessageModel {
  constructor(
    public id: number,
    public content: string,
    public isRead: boolean,
    public author: UserModel,
    public time: Date,
    public thread?: UserModel
  ) {

  }
}
