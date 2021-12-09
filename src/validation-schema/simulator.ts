import { body, ValidationChain } from "express-validator";
import moment from "moment";

export const addSimulator: Array<ValidationChain> = [
    body("start_date").custom(val=>{
        const isValid = moment(val, 'MM/DD/YYYY',true).isValid();
        if(!isValid){
            throw new Error('please provide a valid format MM/DD/YYYY ');
        }
        return true;
    }).customSanitizer(val=>{
        return moment(val, 'MM/DD/YYYY',true).toDate()
    }),
    body("check_date").custom(val=>{
        const isValid = moment(val, 'MM/DD/YYYY',true).isValid();
        if(!isValid){
            throw new Error('please provide a valid format MM/DD/YYYY ');
        }
        return true;
    }).customSanitizer(val=>{
        return moment(val, 'MM/DD/YYYY',true).toDate()
    }),
    body("cryptocurrency").isString().isLength({ min: 2 , max:10 }),
    body("divisa").isString().isLength({ min: 2 , max:20 }),
    body("crypto_price_start").isString(),
    body("crypto_price_check").isString(),
];
  