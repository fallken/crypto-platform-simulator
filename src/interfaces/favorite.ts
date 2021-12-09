import mongoose from "mongoose";
import { UserInterface } from ".";

export interface FavoriteInterface extends mongoose.Document {
    _id: mongoose.Types.ObjectId,
    name: string,
    user: mongoose.Types.ObjectId | Partial<UserInterface>,
    createdAt: Date,
    updatedAt: Date,
};