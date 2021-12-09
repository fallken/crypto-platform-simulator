import mongoose from "mongoose";
import { User } from "../models";
import { UserInterface } from "../interfaces";
import { userLoginInput, userRegisterInput } from "../types";
import { UserInvalidCredentialsException } from "../exceptions/UserInvalidCredentialsException";
import { UserExistsException } from "../exceptions/UserExistsException";
import { HttpCodes } from "../constants";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import * as config from "../config";


export class UserService {
  /**
   * @param  {mongoose.Types.ObjectId} id
   * @returns Promise
   */
  static async getById(id: mongoose.Types.ObjectId): Promise<UserInterface> {
    const query = { id };
    let user = await User.findOne(query, { password: 0 });

    return user;
  }
  /**
   * @param  {string} email
   * @returns Promise
   */
  static async getByEmail(email: string): Promise<UserInterface> {
    const query = { email };
    let user = await User.findOne(query, { password: 0 });

    return user;
  }
  /**
   * @param  {userRegisterInput} userData
   * @returns Promise
   */
  static async createUser(userData: userRegisterInput): Promise<UserInterface> {
    const query = { email: userData.email };
    let user = await User.findOne(query);

    if (user) {
      throw new UserExistsException({
        code: HttpCodes.FORBIDDEN,
        message: "User with same Email already registered",
      });
    }

    user = await User.create(userData);

    return user;
  }
  /**
   * @param  {userLoginInput} credentials
   * @returns Promise
   */
  static async findByCredentials(
    credentials: userLoginInput
  ): Promise<UserInterface> {
    const { email, password } = credentials;
    const query = { email: email };
    let user = await User.findOne(query);

    if (!user) {
      throw new UserInvalidCredentialsException({
        code: HttpCodes.UNAUTHORIZED,
        msg: "The email or password is incorrect",
      });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      throw new UserInvalidCredentialsException({
        code: HttpCodes.UNAUTHORIZED,
        msg: "The email or password is incorrect",
      });
    }

    return user;
  }
  /**
   * @param  {} uid
   * @param  {} expiresIn="365d"
   * @returns string
   */
  static addJwtValidToken(uid, expiresIn = "365d"): string {
    const payload = {
      uid,
    },options = {
      expiresIn,
    };
    const jwtToken:string = jwt.sign(payload,config.JWT_SECRET,options);

    return jwtToken;
  }
}
