import { Response, NextFunction } from "express";
import { UserRequestInterface } from "../interfaces";
import { FavoriteService } from "../services/FavoriteService";
import ResponseHandler from "../utils/HttpUtil";

/**
 * @param  {UserRequestInterface} req
 * @param  {Response} res
 * @param  {NextFunction} next
 * @returns Promise
 */
export const getAllFavoriteItems = async (
  req: UserRequestInterface,
  res: Response,
  next: NextFunction
): Promise<any> => {
  let favoriteItems = await FavoriteService.getAll();

  return new ResponseHandler({ items: favoriteItems }).send(res);
};

/**
 * @param  {UserRequestInterface} req
 * @param  {Response} res
 * @param  {NextFunction} next
 * @returns Promise
 */
export const getUserFavorites = async (
  req: UserRequestInterface,
  res: Response,
): Promise<any> => {
  let userFavoriteItems = await req.user.populate({
    path: "favorites",
    select: {
      name: 1,
    },
  });

  return new ResponseHandler({ items: userFavoriteItems }).send(res);
};


/**
 * @param  {UserRequestInterface} req
 * @param  {Response} res
 * @returns Promise
 */
export const addUserFavorite = async (
  req: UserRequestInterface,
  res: Response
): Promise<any> => {
  let userFavorite = await FavoriteService.add({
    user: req.uid,
    ...req.body,
  });

  return new ResponseHandler(userFavorite).send(res);
};
