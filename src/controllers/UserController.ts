import { Response } from "express";
import { UserRequestInterface } from "../interfaces";
import { UserService } from "../services/UserService";
import ResponseHandler from "../utils/HttpUtil";

/**
 * @param  {UserRequestInterface} req
 * @param  {Response} res
 * @returns Promise
 */
export const getUserProfile = async (
  req: UserRequestInterface,
  res: Response
): Promise<any> => {
  const user = req.user;

  return new ResponseHandler(user).send(res);
};

/**
 * @param  {UserRequestInterface} req
 * @param  {Response} res
 * @returns Promise
 */
export const registerUser = async (
  req: UserRequestInterface,
  res: Response
): Promise<any> => {
  let user = await UserService.createUser(req.body);

  return new ResponseHandler(user).send(res);
};

/**
 * @param  {UserRequestInterface} req
 * @param  {Response} res
 * @returns Promise
 */
export const loginUser = async (
  req: UserRequestInterface,
  res: Response
): Promise<any> => {
  let user = await UserService.findByCredentials(req.body);

  const jwtToken = UserService.addJwtValidToken(user.id);

  return new ResponseHandler({
    id: user._id,
    name: user.name,
    email: user.email,
    token: jwtToken,
  }).send(res);
};
