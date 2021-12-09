import { ExpressError } from "../interfaces";

export class UserInvalidCredentialsException
  extends Error
  implements ExpressError
{
  public code;

  constructor(message, code = undefined) {
    super(message);

    this.name = this.constructor.name;

    Error.captureStackTrace(this, this.constructor);

    this.code = code;
  }
}
