import mongoose from "mongoose";
import { User } from "../models";
import { UserInterface } from "../interfaces";

export class UserService {
  static async getById(id: mongoose.Types.ObjectId): Promise<UserInterface> {
    const query = { id };
    let user = await User.findOne(query, { password: 0 });

    return user;
  }
}
