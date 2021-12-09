import mongoose, { LeanDocument } from "mongoose";
import { Favorite } from "../models";
import { FavoriteInterface } from "../interfaces";
import { addFavoriteInput } from "../types";

export class FavoriteService {
  /**
   * @returns Promise
   */
  static async getAll(): Promise<LeanDocument<FavoriteInterface>[]> {
    let favorites = await Favorite.find().lean();

    return favorites;
  }
  /**
   * @param  {mongoose.Types.ObjectId} id
   * @returns Promise
   */
  static async getById(
    id: mongoose.Types.ObjectId
  ): Promise<FavoriteInterface> {
    const query = { id };
    let favorite = await Favorite.findOne(query);

    return favorite;
  }

  static async add(inputData: addFavoriteInput): Promise<FavoriteInterface> {
    let simulator = await Favorite.create(inputData);

    return simulator;
  }
}
