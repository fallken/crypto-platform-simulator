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
  try {
    let favoriteItems = await FavoriteService.getAll();

    return new ResponseHandler({ items: favoriteItems }).send(res);
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
export const getUserFavorites = async (
  req: UserRequestInterface,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    let userFavoriteItems = await FavoriteService.getUserFavorites(req.uid);

    return new ResponseHandler({ items: userFavoriteItems }).send(res);
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
export const addUserFavorite = async (
  req: UserRequestInterface,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    let userFavorite = await FavoriteService.add({
      user: req.uid,
      ...req.body,
    });

    return new ResponseHandler(userFavorite).send(res);
  } catch (err) {
    next(err);
  }
};
