import mongoose, { LeanDocument } from "mongoose";
import { Favorite } from "../models";
import { FavoriteInterface } from "../interfaces";
import { addFavoriteInput } from "../types";
import { idText } from "typescript";

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

  /**
   * @param  {mongoose.Types.ObjectId} uid
   * @returns Promise
   */
  static async getUserFavorites(
    uid: mongoose.Types.ObjectId
  ): Promise<LeanDocument<FavoriteInterface>[]> {
    const query = {
      user: uid,
    };
    let favorites = await Favorite.find(query,{ user: 0 }).lean();

    return favorites;
  }

  /**
   * @param  {addFavoriteInput} inputData
   * @returns Promise
   */
  static async add(inputData: addFavoriteInput): Promise<FavoriteInterface> {
    let simulator = await Favorite.create(inputData);

    return simulator;
  }
}
