import { NextFunction, Response } from "express";
import { UserRequestInterface } from "../interfaces";
import { SimulatorService } from "../services/SimulatorService";
import ResponseHandler from "../utils/HttpUtil";

/**
 * @param  {UserRequestInterface} req
 * @param  {Response} res
 * @returns Promise
 */
export const getAllSimulatorItems = async (
  req: UserRequestInterface,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    let simulatorItems = await SimulatorService.getAll();

    return new ResponseHandler({ items: simulatorItems }).send(res);
  } catch (err) {
    next(err);
  }
};

/**
 * @param  {UserRequestInterface} req
 * @param  {Response} res
 * @returns Promise
 */
export const getUserSimulators = async (
  req: UserRequestInterface,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    let userSimulatorItems = await SimulatorService.getUserSimulators(req.uid);

    return new ResponseHandler({ items: userSimulatorItems }).send(res);
  } catch (err) {
    next(err);
  }
};

/**
 * @param  {UserRequestInterface} req
 * @param  {Response} res
 * @returns Promise
 */
export const addUserSimulator = async (
  req: UserRequestInterface,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const data = req.body;
    let simulator = await SimulatorService.add({
      user: req.uid,
      name: data.name,
      cryptocurrency: data.cryptocurrency,
      currency: data.currency,
      divisa: data.divisa,
      price: data.price,
      quantity: data.quantity,
      cryptoPriceStart: data.crypto_price_start,
      cryptoPriceCheck: data.crypto_price_check,
      startDate: data.start_date,
      checkDate: data.check_date,
    });

    return new ResponseHandler(simulator).send(res);
  } catch (err) {
    next(err);
  }
};
