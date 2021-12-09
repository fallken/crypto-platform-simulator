import { body, ValidationChain } from "express-validator";
import bcrypt from "bcrypt";

export const userRegister: Array<ValidationChain> = [
  body("name").isString().trim().isLength({ min: 5 }),
  body("nickname").optional().isString().trim().isLength({ min: 3 }),
  body("email").isEmail().withMessage("Please submit a valid email"),
  body("password")
    .isString()
    .isLength({ min: 6, max: 32 })
    .not()
    .isEmpty()
    .trim()
    .customSanitizer((password) => {//converting the password to hash before going forward
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
  