import { MessageModel } from "../message/message.model";

export class UserModel {
    constructor(
      public name: string,
      public id: number,
      public messages?: MessageModel[]
    ) {

    }
}
