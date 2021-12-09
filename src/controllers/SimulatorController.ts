import { Response } from "express";
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
): Promise<any> => {
  let simulatorItems = await SimulatorService.getAll();

  return new ResponseHandler({ items: simulatorItems }).send(res);
};

/**
 * @param  {UserRequestInterface} req
 * @param  {Response} res
 * @returns Promise
 */
export const getUserSimulators = async (
    req: UserRequestInterface,
    res: Response,
  ): Promise<any> => {
    let userSimulatorItems = await req.user.populate({
        path: "simulators",
        select: {
            user: 0
        }
    });
  
    return new ResponseHandler({ items: userSimulatorItems }).send(res);
  };

  
/**
 * @param  {UserRequestInterface} req
 * @param  {Response} res
 * @returns Promise
 */
export const addUserSimulator = async (
    req: UserRequestInterface,
    res: Response,
  ): Promise<any> => {
    let simulator = await SimulatorService.add({
        user: req.uid,
        ...req.body
    });
  
    return new ResponseHandler(simulator).send(res);
  };