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
    _id: string,
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
    start_date: Date,
    check_date: Date,
    cryptocurrency: string,
    divisa: string,
    crypto_price_start: number,
    crypto_price_check: number,
}

export type addFavoriteInput = {
    user: mongoose.Types.ObjectId,
    name: string 
}