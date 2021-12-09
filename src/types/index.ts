import mongoose from "mongoose";

export type ResponseBody = {
    meta: {
        code: number,
        msg: string | null,
        detail: object
    },
    data: object
}


export type ValidatorErrorObject = {
    msg: string,
    param: object
}

export type JwtPayload = {
    uid: string,
}

export type userRegisterInput = {
    name: string,
    email: string ,
    password: string ,
    nickname?: string ,
}

export type userLoginInput = {
    email: string ,
    password: string ,
}

export type addSimulatorInput = {
    user: mongoose.Types.ObjectId,
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
}

export type addFavoriteInput = {
    user: mongoose.Types.ObjectId,
    name: string 
}