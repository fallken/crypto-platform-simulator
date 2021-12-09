import mongoose from "mongoose";
import { UserInterface } from ".";

export interface SimulatorInterface extends mongoose.Document {
    _id: mongoose.Types.ObjectId,
    name: string,
    nickname: string,
    email: string,
    capital: number,
    divisa: string,
    prefered_cryptocurrency: string,
    user?: Partial<UserInterface>,
};