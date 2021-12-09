import { NextFunction, Response } from "express";
import { UserRequestInterface } from "../interfaces";
import { UserService } from "../services/UserService";
import ResponseHandler from "../utils/HttpUtil";

/**
 * @param  {UserRequestInterface} req
 * @param  {Response} res
 * @param  {NextFunction} next
 * @returns Promise
 */
export const getUserProfile = async (
  req: UserRequestInterface,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const user = req.user;
    return new ResponseHandler({
      _id: user._id,
      name: user.name,
      email: user.email,
    }).send(res);
  } catch (err) {
    next(err);
  }
};

/**
 * @param  {UserRequestInterface} req
 * @param  {Response} res
 * @param  {NextFunction} next
 * @returns Promise
 */
export const registerUser = async (
  req: UserRequestInterface,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {

    const data=req.body,userData = {
      name: data.name,
      email: data.email,
      password: data.password,
      preferedCryptocurrency: data.prefered_cryptocurrency,
      nickname: data.nickname ?? undefined ,
    }
    let user = await UserService.createUser(userData);

    return new ResponseHandler(user).send(res);
  } catch (err) {
    next(err);
  }
};

/**
 * @param  {UserRequestInterface} req
 * @param  {Response} res
 * @param  {NextFunction} next
 * @returns Promise
 */
export const loginUser = async (
  req: UserRequestInterface,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    let user = await UserService.findByCredentials(req.body);

    const jwtToken = UserService.addJwtValidToken(user.id);
    return new ResponseHandler({
      id: user._id,
      name: user.name,
      email: user.email,
      token: jwtToken,
    }).send(res);
  } catch (err) {
    next(err);
  }
};
