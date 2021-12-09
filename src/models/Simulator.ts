import mongoose from "mongoose";
import { UserCollectionName } from ".";
import { SimulatorInterface } from "../interfaces/simulator";

const { Schema } = mongoose;

const schema = new Schema(
  {
    cryptocurrency: String,
    name: String,
    currency: String,
    divisa: String,
    price: Number,
    quantity: Number,
    cryptoPriceStart: Number,
    cryptoPriceCheck: Number,
    startDate:Date,
    checkDate:Date,

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: UserCollectionName,
    },
  },
  {
    timestamps: true,
  }
);

export const SimulatorCollectionName = "Simulator";

export const Simulator = mongoose.model<SimulatorInterface>(SimulatorCollectionName, schema);
