import { Request } from "express"
import { UserInterface } from ".";
import mongoose from "mongoose";

export interface UserRequestInterface extends Request {
  uid: mongoose.Types.ObjectId,
  user: Partial<UserInterface>,
}