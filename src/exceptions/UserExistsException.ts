import { ExpressError } from "../interfaces";

export class UserExistsException extends Error implements ExpressError {
  public code;

  constructor(message, code = undefined) {
    super(message);

    // assign the error class name in your custom error (as a shortcut)
    this.name = this.constructor.name;

    // capturing the stack trace keeps the reference to your error class
    Error.captureStackTrace(this, this.constructor);

    this.code = code;
  }
}
