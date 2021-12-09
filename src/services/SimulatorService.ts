import mongoose, { LeanDocument } from "mongoose";
import { Simulator } from "../models";
import { SimulatorInterface } from "../interfaces";
import { addSimulatorInput } from "../types";

export class SimulatorService {
  
  /**
   * @param  {mongoose.Types.ObjectId} id
   * @returns Promise
   */
  static async getById(id: mongoose.Types.ObjectId): Promise<SimulatorInterface> {
    const query = { id };
    let simulator = await Simulator.findOne(query);

    return simulator;
  }
  
  /**
   * @returns Promise
   */
  static async getAll(): Promise<LeanDocument<SimulatorInterface>[]> {
    let simulators = await Simulator.find().lean();

    return simulators;
  }
  
  /**
   * @param  {addSimulatorInput} inputData
   * @returns Promise
   */
  static async add(inputData:addSimulatorInput):  Promise<SimulatorInterface> {
    let simulator = await Simulator.create(inputData);

    return simulator;
  }

}
