import mongoose from "mongoose";
import { FavoriteInterface } from "./favorite";
import { SimulatorInterface } from "./simulator";

export interface UserInterface extends mongoose.Document {
  _id: mongoose.Types.ObjectId;
  name: string;
  nickname: string;
  email: string;
  password: string;
  capital: number;
  divisa: string;
  prefered_cryptocurrency: string;
  favorites?: [ Partial<FavoriteInterface> ];
  simulators?: [ Partial<SimulatorInterface> ];
}
