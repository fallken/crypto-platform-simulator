import mongoose from "mongoose";
import { UserInterface } from "../interfaces";

const { Schema } = mongoose;

const schema = new Schema(
  {
    name: String,
    nickname: String,
    email: String,
    password: String,
    capital: Number,
    divisa: String,
    preferedCryptocurrency: String,
  },
  {
    timestamps: true,
  }
);

export const UserCollectionName = "User";

export const User = mongoose.model<UserInterface>(UserCollectionName, schema);
