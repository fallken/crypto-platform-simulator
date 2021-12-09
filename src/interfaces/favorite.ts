import mongoose from "mongoose";
import { UserInterface } from ".";

export interface FavoriteInterface extends mongoose.Document {
    _id: mongoose.Types.ObjectId,
    user_id: mongoose.Types.ObjectId,
    nickname: string,
    email: string,
    capital: number,
    divisa: string,
    prefered_cryptocurrency: string,

    user?: Partial<UserInterface>,
};