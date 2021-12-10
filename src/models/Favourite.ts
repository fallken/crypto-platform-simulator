import mongoose from "mongoose";
import { UserCollectionName } from ".";
import { FavoriteInterface } from "../interfaces/favorite";

const { Schema } = mongoose;

const schema = new Schema(
  {
    name: String,
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: UserCollectionName,
    },
  },
  {
    timestamps: true,
  }
);

export const FavoriteCollectionName = "Favourite";

export const Favorite = mongoose.model<FavoriteInterface>(FavoriteCollectionName, schema);
