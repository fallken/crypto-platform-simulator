import { Response, NextFunction } from "express";
import ResponseHandler from "../utils/HttpUtil";
import jwt from "jsonwebtoken";
import * as config from "../config";
import { HttpCodes, httResponse } from "../constants";
import { UserService } from "../services/UserService";
import mongoose from "mongoose";
import { JwtPayload } from "../types";
import { UserRequestInterface } from "../interfaces";

const jwtTokenAuth = async (
  req: UserRequestInterface,
  res: Response,
  next: NextFunction
) => {
  try {
    let auth_header = req.header("Authorization");

    if (!auth_header) {
      throw new Error("validated token user not found ");
    }
    const token = auth_header.replace("Bearer ", "");
    const data = jwt.verify(token, config.JWT_SECRET) as JwtPayload;

    const user = await UserService.getById(
      new mongoose.Types.ObjectId(data._id)
    );

    if (!user) {
      throw new Error("validated token user not found ");
    }

    req.user = user;
    req.uid = data._id;

    next();
  } catch (err) {
    console.log("authorization err : ", err.message);
    return new ResponseHandler(
      null,
      HttpCodes.UNAUTHORIZED,
      err.message ?? httResponse[401]
    ).send(res);
  }
};

export default jwtTokenAuth;
