import { body, ValidationChain } from "express-validator";
import moment from "moment";

export const addSimulator: Array<ValidationChain> = [
    body("start_date").custom(val=>{
        const isValid = moment(val, 'DD/MM/YYYY',true).isValid();
        if(!isValid){
            throw new Error('please provide a valid format DD/MM/YYYY ');
        }
        return true;
    }).customSanitizer(val=>{
        return moment(val, 'DD/MM/YYYY',true).toDate()
    }),
    body("check_date").custom(val=>{
        const isValid = moment(val, 'DD/MM/YYYY',true).isValid();
        if(!isValid){
            throw new Error('please provide a valid format DD/MM/YYYY ');
        }
        return true;
    }).customSanitizer(val=>{
        return moment(val, 'DD/MM/YYYY',true).toDate()
    }),
    body("name").isString().isLength({ min: 2 , max:20 }),
    body("cryptocurrency").isString().isLength({ min: 2 , max:10 }),
    body("currency").isString().isIn(["USD", "EUR"]).withMessage("Currency should be USD or ERU"),
    body("divisa").isString().isLength({ min: 2 , max:20 }),
    body("price").isNumeric(),
    body("quantity").isNumeric(),
    body("crypto_price_start").isNumeric().withMessage("Input should be numberic"),
    body("crypto_price_check").isNumeric().withMessage("Input should be numberic"),
];
  