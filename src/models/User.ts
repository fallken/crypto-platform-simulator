import mongoose from "mongoose";
import { FavoriteCollectionName, SimulatorCollectionName } from ".";
import { UserInterface } from "../interfaces";

const { Schema } = mongoose;

const schema = new Schema({
  name: String,
  nickname: String,
  email: String,
  password: String,
  capital: Number,
  divisa: String,
  prefered_cryptocurrency: String,

  favorites: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: FavoriteCollectionName
    }
  ],

  simulators: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: SimulatorCollectionName
    }
  ],
});

export const UserCollectionName = "User";

export const User = mongoose.model<UserInterface>(UserCollectionName, schema);
