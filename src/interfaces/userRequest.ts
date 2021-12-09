import { Request } from "express"
import { UserInterface } from ".";

export interface UserRequestInterface extends Request {
  uid: string,
  user: Partial<UserInterface>,
}