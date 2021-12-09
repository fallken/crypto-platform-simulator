import mongoose from "mongoose";
import { UserInterface } from ".";

export interface SimulatorInterface extends mongoose.Document {
    _id: mongoose.Types.ObjectId,
    name: string,
    startDate: Date,
    checkDate: Date,
    price: number,
    quantity: number,
    currency: string,
    cryptocurrency: string,
    divisa: string,
    cryptoPriceStart: number,
    cryptoPriceCheck: number,
    user?: mongoose.Types.ObjectId | Partial<UserInterface>,
    createdAt: Date,
    updatedAt: Date,
};