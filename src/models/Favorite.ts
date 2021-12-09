import mongoose from "mongoose";
import { UserCollectionName } from ".";

const { Schema } = mongoose;

const schema = new Schema(
  {
    name: String,
    favorites: [String],

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: UserCollectionName,
    },
  },
  {
    timestamps: true,
  }
);

export const FavoriteCollectionName = "Favorite";

export const Favorite = mongoose.model(FavoriteCollectionName, schema);
