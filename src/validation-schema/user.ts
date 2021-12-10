import { body, ValidationChain } from "express-validator";
import bcrypt from "bcrypt";

export const userRegister: Array<ValidationChain> = [
  body("name").isString().trim().isLength({ min: 3 }),
  body("divisa").isString().trim().isLength({ min: 2 }),
  body("nickname").optional().isString().trim().isLength({ min: 3 }),
  body("capital").isNumeric(),
  body("nickname").optional().isString().trim().isLength({ min: 3 }),
  body("email").isEmail().withMessage("Please submit a valid email"),
  body("prefered_cryptocurrency").isString().withMessage("prefered_cryptocurrency cannot be null"),
  body("password")
    .isString()
    .isLength({ min: 6, max: 32 })
    .not()
    .isEmpty()
    .trim()
    .customSanitizer((password) => {//hashing the password before passing it to contorller
       return bcrypt.hash(password, 8);
    }),
];


export const userLogin: Array<ValidationChain> = [
    body("email").isEmail().withMessage("Please submit a valid email"),
    body("password")
      .isString()
      .isLength({ min: 6, max: 32 })
      .not()
      .isEmpty()
      .trim(),
  ];
  