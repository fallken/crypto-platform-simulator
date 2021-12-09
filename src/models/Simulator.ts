import mongoose from "mongoose";
import { UserCollectionName } from ".";
import { SimulatorInterface } from "../interfaces/simulator";

const { Schema } = mongoose;

const schema = new Schema(
  {
    dateRecorded: Date,
    cryptocurrency: String,
    euros: Number,
    price: Number,
    quantity: Number,

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
