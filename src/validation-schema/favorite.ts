import { body, ValidationChain } from "express-validator";

export const addFavorite: Array<ValidationChain> = [
    body("name").isString().isLength({ min: 2 , max:20 }),
];
  